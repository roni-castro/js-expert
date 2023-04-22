import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML('afterbegin', template);
  }

  prepareData(data) {
    const [firstRow] = data;
    const tableHeaders = Object.keys(firstRow).map(
      (header) => `<th scope="col">${header}</th>`
    );

    const joinLists = (list) => list.join('');

    const tableBodyValues = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinLists(tds)}</tr>`);

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
