export class DateUtil {
  static formatDate(arg: Date): string {
    const year = arg.getFullYear();
    const month = arg.getMonth() + 1;
    const date = arg.getDate();

    return year + '/' + this.digit2(month) + '/' + this.digit2(date);
  }

  static formatDateTime(arg: Date): string {
    const week = ['日', '月', '火', '水', '木', '金', '土'];
    const hour = arg.getHours();
    const minute = arg.getMinutes();
    const day = week[arg.getDay()];

    return this.formatDate(arg) + ' (' + day + ') ' + this.digit2(hour) + ':' + this.digit2(minute);
  }

  private static digit2(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }
}
