/* @flow */
export function logger(data: Object) {
  if (data) {
    const { Columns, ...rest } = data;
    // TODO: Better logger printer
    console.log('');
    console.log(rest);
    console.log('');
  }
}
