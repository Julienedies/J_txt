/**
 * Created by j on 18/8/18.
 */

import path from 'path'

import fetchX from './fetch'
import jo from '../../jsono'

const SOURCES = ['ths_new', 'ths_p', 'ths_c', 'ycj']

let timer
let isStop = false
let stat = {}

/**
 * @param stocks {Array}
 * @param index {Number}
 * @param sources {Array}
 * @param csdPath {String}
 * @param watcher {Function}
 */
function start (stocks, index, sources, csdPath, watcher) {

    let arr = stocks[index]
    if (!arr) {
        stat = {over: true, index: index}
        watcher(stat)
        return console.log(`fetch over, size is ${ index }`)
    }

    let [code, name] = arr
    let progress = (index + 1) / stocks.length * 100
    progress = progress.toFixed(2)
    progress = `${ (index + 1) }/${ stocks.length }`
    stat = {name, code, index, progress}
    watcher(stat)

    let promises = sources.map((id, index) => {
        return fetchX(code, id, index * (Math.random() + 0.1) * 3000)
    });

    Promise.all(promises)
        .then(data => {

            let sjo = jo(path.resolve(csdPath, `./s/${ code }.json`));

            sjo.merge({"名称": name, "code": code});

            for (let v of data) {
                sjo.merge(v.result);
            }

            sjo.save();

            timer = setTimeout(function () {

                !isStop && start(stocks, index + 1, sources, csdPath, watcher)

            }, (Math.random() + 0.1) * 3000);

        })
        .catch(err => {
            console.error(err);
            watcher(stat, err);
        });

}

/**
 *
 * @param csdPath {String} csd目录路径
 * @param stocks {Array|String} [['300059', '东方财富']]  股票数组或json文件路径
 * @param index {Number|String} 股票数组索引 或者 stock code,如果是stock code, 则需要根据code获取code在股票数组中的索引
 * @param sources {Array}  ['ths_new', 'ths_p', 'ths_c'] 数据源ID
 * @param watcher {Function}
 * @return
 */
function _fetch (csdPath, stocks, index, sources, watcher = stats => console.log(stats)) {

    if (!csdPath) throw new Error('必须提供csd数据存储路径.');

    //return new Promise((resolve, reject) => {

        if (!stocks) {
            stocks = jo(path.resolve(csdPath, './stocks.json')).json;
        }

        // 如果提供的参数是json文件路径
        if (typeof stocks === 'string' && /\.json$/.test(stocks)) {
            stocks = jo(path.resolve(csdPath, stocks)).json;
        }

        index = index * 1
        // 如果提供的是code，先获取code的索引
        if (/^\d{6}$/.test('' + index)) {
            for (let i = 0; i < stocks.length; i++) {
                if (stocks[i][0] * 1 === index) {
                    index = i;
                    break;
                }
            }
        }

        sources = sources || SOURCES;

        console.log(`stocks.length is ${ stocks.length }`);

        isStop = false;

        // -------------------------------------------------------------------------------- start

            start(stocks, index, sources, csdPath, (stats) => {
                watcher(stats)
            });


        // -------------------------------------------------------------------------------- end

    //});

}

// fetch2用于包装_fetch, 接收对象参数
function fetch ({csdPath, stocks, index, sources, watcher}) {
    return _fetch(csdPath, stocks, index, sources, watcher)
}

fetch.stop = _fetch.stop = function () {
    console.log('clear fetch timer =>', timer)
    clearTimeout(timer)
    isStop = true
    return stat
}

fetch.SOURCES = _fetch.SOURCES = SOURCES

export default _fetch

export { fetch }
