import Excel from 'exceljs';
import FileSaver from 'file-saver';
import { BasicColumn } from '/@/components/Table';
import { isNumber } from '/@/utils/is';
import moment from 'moment';

export function objToExcleData(columns: BasicColumn[], data: any[]) {
  const arr: any[] = [];
  for (let i = 0; i < data.length; i++) {
    arr[i] = [];
    for (let j = 0; j < columns.length; j++) {
      const bd = columns[j].dataIndex;
      if (bd) {
        arr[i][j] = dp(data[i], bd);
      } else {
        arr[i][j] = '';
      }
    }
  }
  return arr;
}

export function dp(data: any, path: string) {
  let _name = data;
  const _path = path.split('.');
  let i;
  for (i in _path) {
    if (_name[_path[i]]) {
      _name = _name[_path[i]];
    } else {
      return '';
    }
  }
  return _name;
}

export function exportExcle(
  columns: BasicColumn[],
  data: any[],
  title = 'new'
): Promise<Excel.Buffer> {
  return new Promise((resolve, reject) => {
    const header = columns.map((it) => it.title || '');
    const excleData = objToExcleData(columns, data);
    const ExcleData = [header, ...excleData];
    const tw: any = [];
    // 表格宽度
    ExcleData.forEach((d: any[]) => {
      d.forEach((it, i) => {
        console.log(it);
        let length;
        if (isNumber(it)) {
          length = (it + '').length;
        } else {
          length = it ? it.replace(/[\u0391-\uFFE5]/g, 'aa').length : 0;
        }
        if (tw[i]) {
          if (length > tw[i]) tw[i] = length;
        } else {
          tw[i] = length;
        }
      });
    });
    const workbook = new Excel.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');
    sheet.addRows(ExcleData);
    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (rowNumber === 1) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
          };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFf6f8fa' },
          };
        } else {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
          };
        }
        // 边框
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        // 设置列宽
        sheet.getColumn(colNumber).width = tw[colNumber - 1] + 8;
        // sheet.getColumn(colNumber).width = 25;
      });
      row.height = 20;
    });
    sheet.getRow(1).height = 30;

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        saveAsExcelFile(buffer, title + ' ' + moment(new Date()).format('YYYY-MM-DD HH_mm_ss'));
        resolve(buffer);
      })
      .catch((err) => reject(err));
  });
}

export function saveAsExcelFile(buffer: any, fileName: any) {
  const data = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });
  FileSaver.saveAs(data, fileName + '.xlsx');
}
