import { Component } from '@angular/core';
class GiaoDich {
  id: number;
  giaTriGiaoDich: number;
  loaiGiaoDich: string;
  nhomLoaiHinhGiaoDich: string;
  tongGiaTriCacGiaoDichTruocDo: number;
  tongGiaTriCacGiaoDichLoaiABTruocDo: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  giaTriGiaoDich: number;
  nhomLoaiHinhGiaoDich = [
    {
      value: '1',
      text: 'Nhóm 1 - Tra cứu thông tin, chuyển tiền trong cùng ngân hàng, cùng chủ tài khoản',
    },
    { value: '2', text: 'Nhóm 2 - Thanh toán' },
    {
      value: '3',
      text: 'Nhóm 3 - Chuyển tiền trong cùng ngân hàng, khác chủ tài khoản. Chuyển tiền liên ngân hàng trong nước. Nạp/rút ví',
    },
    { value: '4', text: 'Nhóm 4 - Chuyển tiền liên ngân hàng ra nước ngoài' },
  ];
  nhomLoaiHinhGiaoDichHienTai = '1';
  danhSachGiaoDich: GiaoDich[] = [];
  tongGiaTriCacGiaoDich = 0;
  tongGiaTriCacGiaoDichLoaiAB = 0;

  submit() {
    if (!this.giaTriGiaoDich) {
      alert('Vui lòng nhập giá trị giao dịch');
      return;
    } else {
      this.tinhToan();
    }
  }

  timViTriGiaoDichLoaiCDCuoiCung(items: any[]): number {
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].loaiGiaoDich === 'C' || items[i].loaiGiaoDich === 'D') {
        return i;
      }
    }
    return -1;
  }

  tinhToan() {
    let T = 0;
    let G = this.giaTriGiaoDich;
    let Tksth = 0;
    let loaiGiaoDich = '';
    console.log(G + T);
    if (this.danhSachGiaoDich.length > 0) {
      T = this.danhSachGiaoDich.reduce(
        (acc, current) => acc + Number(current.giaTriGiaoDich),
        0
      );

      // let last = this.danhSachGiaoDich[this.danhSachGiaoDich.length - 1];
      let lastIndex = this.timViTriGiaoDichLoaiCDCuoiCung(
        this.danhSachGiaoDich
      );
      Tksth = this.danhSachGiaoDich
        .filter(
          (item, index) =>
            (item.loaiGiaoDich === 'A' && index > lastIndex) ||
            (item.loaiGiaoDich === 'B' && index > lastIndex)
        )
        .reduce((acc, current) => acc + Number(current.giaTriGiaoDich), 0);
    }

    switch (this.nhomLoaiHinhGiaoDichHienTai) {
      case '1':
        loaiGiaoDich = 'A';
        break;
      case '2':
        if (G + T <= 5000000) loaiGiaoDich = 'A';
        else if (G + T > 5000000 && G + T <= 100000000) loaiGiaoDich = 'B';
        else if (G + T > 100000000 && G + T <= 1500000000) loaiGiaoDich = 'C';
        else loaiGiaoDich = 'D';
        break;
      case '3':
        if (G <= 10000000 && G + Tksth <= 20000000) loaiGiaoDich = 'B';
        if (G <= 10000000 && G + Tksth > 20000000 && G + T <= 1500000000)
          loaiGiaoDich = 'C';
        if (G > 10000000 && G <= 500000000 && G + T <= 1500000000)
          loaiGiaoDich = 'C';

        if (G <= 10000000 && G + Tksth > 20000000 && G + T > 1500000000)
          loaiGiaoDich = 'D';
        if (G > 10000000 && G <= 500000000 && G + T > 1500000000)
          loaiGiaoDich = 'D';
        if (G > 500000000) loaiGiaoDich = 'D';
        break;
      case '4':
        if (G <= 200000000 && G + T <= 1000000000) loaiGiaoDich = 'C';
        if (G <= 200000000 && G + T > 1000000000) loaiGiaoDich = 'D';
        if (G > 200000000) loaiGiaoDich = 'D';
        break;
      default:
        loaiGiaoDich = 'Không xác định';
    }

    let newItem = new GiaoDich();
    newItem.id = this.danhSachGiaoDich.length + 1;
    newItem.giaTriGiaoDich = Number(G);
    newItem.loaiGiaoDich = loaiGiaoDich;
    newItem.nhomLoaiHinhGiaoDich = this.nhomLoaiHinhGiaoDichHienTai;
    newItem.tongGiaTriCacGiaoDichTruocDo = T;
    newItem.tongGiaTriCacGiaoDichLoaiABTruocDo = Tksth;
    this.danhSachGiaoDich.push(newItem);
    this.tongGiaTriCacGiaoDich = T + G;
    this.tongGiaTriCacGiaoDichLoaiAB =
      loaiGiaoDich === 'A' || loaiGiaoDich === 'B' ? Tksth + G : 0;
    console.table(this.danhSachGiaoDich);
  }

  chonNhomGiaoDich(event: any) {
    this.nhomLoaiHinhGiaoDichHienTai = event.target.value;
    console.log(this.nhomLoaiHinhGiaoDichHienTai);
  }
}
