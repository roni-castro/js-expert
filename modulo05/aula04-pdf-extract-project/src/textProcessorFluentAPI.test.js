const {describe, it} = require('mocha');
const {expect} = require('chai');
const validFileMock = require('../mocks/valid.js');
const TextProcessorFluentAPI = require('./textProcessorFluentAPI.js');

describe('TextProcessorFluentAPI Suit tests', () => {
  it('#build', () => {
    const content = validFileMock;
    const result = new TextProcessorFluentAPI(content).build();
    expect(result).to.be.deep.equal(content);
  });

  it('#extractPeopleData', () => {
    const content = validFileMock;
    const result = new TextProcessorFluentAPI(content)
      .extractPeopleData()
      .build();
    expect(result).to.be.deep.equal([
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. '
      ].join('\n')
    ]);
  });

  it('#divideTextInColumns', () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. '
      ].join('\n')
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();
    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ],
      [
        'Arya Robbin',
        ' belga',
        ' casado',
        ' CPF 884.112.200-52',
        ' residente e \ndomiciliada a Av. paulista',
        ' 1400',
        ' bairro Consolação',
        ' São Paulo. '
      ],
      [
        'Júlia Menezes',
        ' brasileira',
        ' solteira',
        ' CPF 297.947.800-81',
        ' residente e \ndomiciliada a Av. dos Estados',
        ' 99',
        ' bairro Jardins',
        ' São Paulo. '
      ]
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#divideTextInColumns', () => {
    const content = [
      [
        'Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ',
        'domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. '
      ].join('\n'),
      [
        'Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ',
        'domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. '
      ].join('\n'),
      [
        'Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ',
        'domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. '
      ].join('\n')
    ];

    const result = new TextProcessorFluentAPI(content)
      .divideTextInColumns()
      .build();
    const expected = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ],
      [
        'Arya Robbin',
        ' belga',
        ' casado',
        ' CPF 884.112.200-52',
        ' residente e \ndomiciliada a Av. paulista',
        ' 1400',
        ' bairro Consolação',
        ' São Paulo. '
      ],
      [
        'Júlia Menezes',
        ' brasileira',
        ' solteira',
        ' CPF 297.947.800-81',
        ' residente e \ndomiciliada a Av. dos Estados',
        ' 99',
        ' bairro Jardins',
        ' São Paulo. '
      ]
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#removeEmptyChars', () => {
    const content = [
      [
        'Xuxa da Silva',
        ' brasileira',
        ' casada',
        ' CPF 235.743.420-12',
        ' residente e \ndomiciliada a Rua dos bobos',
        ' zero',
        ' bairro Alphaville',
        ' São Paulo. '
      ],
      [
        'Arya Robbin',
        ' belga',
        ' casado',
        ' CPF 884.112.200-52',
        ' residente e \ndomiciliada a Av. paulista',
        ' 1400',
        ' bairro Consolação',
        ' São Paulo. '
      ],
      [
        'Júlia Menezes',
        ' brasileira',
        ' solteira',
        ' CPF 297.947.800-81',
        ' residente e \ndomiciliada a Av. dos Estados',
        ' 99',
        ' bairro Jardins',
        ' São Paulo. '
      ]
    ];

    const result = new TextProcessorFluentAPI(content)
      .removeEmptyChars()
      .build();
    const expected = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.'
      ],
      [
        'Arya Robbin',
        'belga',
        'casado',
        'CPF 884.112.200-52',
        'residente e domiciliada a Av. paulista',
        '1400',
        'bairro Consolação',
        'São Paulo.'
      ],
      [
        'Júlia Menezes',
        'brasileira',
        'solteira',
        'CPF 297.947.800-81',
        'residente e domiciliada a Av. dos Estados',
        '99',
        'bairro Jardins',
        'São Paulo.'
      ]
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it('#mapPerson', () => {
    const content = [
      [
        'Xuxa da Silva',
        'brasileira',
        'casada',
        'CPF 235.743.420-12',
        'residente e domiciliada a Rua dos bobos',
        'zero',
        'bairro Alphaville',
        'São Paulo.'
      ]
    ];

    const result = new TextProcessorFluentAPI(content).mapPerson().build();
    const expected = [
      {
        nome: 'Xuxa da Silva',
        nationality: 'Brasileira',
        maritalStatus: 'Casada',
        cpf: '23574342012',
        address: 'Rua dos bobos',
        number: 'zero',
        neighborhood: 'Alphaville',
        state: 'São Paulo'
      }
    ];

    expect(result).to.be.deep.equal(expected);
  });
});
