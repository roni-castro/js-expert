import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML('afterbegin', template);
  }

  prepareData(data) {
    const joinLists = (list) => list.join('');

    const [firstRow] = data;
    const tableColumns = Object.keys(firstRow)
    const tableHeaders = tableColumns.map(tableColumn => `<th scope="col">${tableColumn}</th>`);

    const tableBodyValues = data.map(row => {
      const tableValues = Object.values(row)
      const tds = tableValues.map(tableValue => `<td>${tableValue}</td>`)
      return `<tr>${joinLists(tds)}</tr>`
    })

    const template = `
      <table class="table">
        <thead class="thead-dark">
          <tr>
            ${joinLists(tableHeaders)}
          </tr>
        </thead>
        <tbody>
          ${joinLists(tableBodyValues)}
        </tbody>
      </table>
    `;

    return template;
  }
}
