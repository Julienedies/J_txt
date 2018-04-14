/**
 * Created by j on 18/3/10.
 * @todo 解析csv格式文本文件到json文件
 * @param csv_file String  csv文件名
 * @param json_file String json文件名
 * @param cols Array   要截取的列索引，默认所有列
 */

var fs = require('fs');

module.exports = function (csv_file, json_file, cols) {

    if (!json_file) {
        json_file = csv_file.split('.').shift() + '.js';
        cols = [0, 1];
    } else if (typeof json_file == 'object' && json_file.shift) {
        cols = json_file;
        json_file = csv_file.split('.').shift() + '.js';
    }

    fs.readFile(csv_file, function (err, data) {
        if (err) {
            return console.error(err);
        }
        data = data.toString();
        var rows = data.split('\r\n');
        rows.shift();
        rows.pop();
        rows.pop();
        //console.log(rows[0]) ;
        //console.log(rows[rows.length-2]);
        //return;
        var rows2 = [];
        rows.forEach(function (row) {
            var arr = row.split(/[\t]+/);
            if (cols.length == 0) {
                rows2.push(arr);
            } else {
                rows2.push(arr.filter(function (x, i) {
                    return cols.indexOf(i) >= 0;
                }));
            }
        });

        //解析后的数据写入新文件
        fs.open(json_file, 'w', function (err, fd) {
            if (err) {
                return console.err(err);
            }
            fs.write(fd, JSON.stringify(rows2), function (err) {
                if (err) {
                    return console.err(err);
                }
                fs.close(fd);
            })
        });

    });
};
