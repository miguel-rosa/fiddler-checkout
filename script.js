const DEFAULT_VALUES_COUNTRIES = [
{
    "url":"https://www.motorola.co.uk",
    "code": "UK"
  },
  {
    "url":"https://www.motorola.es",
    "code": "ES"
  },
  {
    "url":"https://www.motorola.de",
    "code": "DE"
  },
  {
    "url":"https://www.motorola.com/pl",
    "code": "PL"
  },
  {
    "url":"https://www.motorola.com/nl",
    "code": "NL"
  },
  {
    "url":"https://www.motorola.fr",
    "code": "FR"
  },
  {
    "url":"https://www.motorola.it",
    "code": "IT"
  },
  {
    "url":"https://www.motorola.com/ro",
    "code": "RO"
  },
  {
    "url":"https://www.motorola.com/sk/sk",
    "code": "SK"
  },
  {
    "url":"https://www.motorola.ae",
    "code": "MEA"
  },
  {
    "url":"https://www.motorola.com/cz",
    "code": "CZ"
  },
  {
    "url":"https://www.motorola.com/ua",
    "code": "UA"
  },
  {
    "url":"https://www.motorola.com/hr",
    "code": "HR"
  },
  {
    "url":"https://www.motorola.com/at",
    "code": "AT"
  },
  {
    "url":"https://www.motorola.com/be/nl",
    "code": "BENL"
  },
  {
    "url":"https://www.motorola.com/be/fr",
    "code": "BEFR"
  }
]

const elementCountries = document.querySelector('.countries');
const buttonGenerate = document.getElementById('generate-xml')

function generateScripts(countries){
  let string;
  console.log('countries', countries)
  const prefix = `<?xml version="1.0" encoding="utf-8"?>
    <AutoResponder LastSave="2021-02-10T10:17:56.5716616-03:00" FiddlerVersion="5.0.20204.45441">
      <State Enabled="true" AcceptAllConnects="false" Fallthrough="true" UseLatency="false">
  `;
  const posfix = `  
    </State>
  </AutoResponder>
  `;
  for(const country of countries){
    console.log('country', country)
    string = (string ? string : '') + `
    <!-- MOTOROLA ${country.code}  -->
    <ResponseRule 
      Match="${country.url}/files/checkout6-custom.js" 
      Action="C:\\Users\\Corebiz\\Desktop\\Miguel\\[Motorola] - Vtex dev\\VTEX-Motorola-Checkout\\production\\${country.code}\\checkout6-custom.js" Enabled="true" 
      />
    <ResponseRule 
      Match="${country.url}/files/checkout6-custom.css" 
      Action="C:\\Users\\Corebiz\\Desktop\\Miguel\\[Motorola] - Vtex dev\\VTEX-Motorola-Checkout\\production\\${country.code}\\checkout6-custom.css" Enabled="true"
    />`
  }
  return prefix + string + posfix
}


function download(data, filename) {
    var file = new Blob([data]);
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

elementCountries.value = JSON.stringify(DEFAULT_VALUES_COUNTRIES);

buttonGenerate.addEventListener('click', () => {
  const fileContent = generateScripts(JSON.parse(elementCountries.value))
  download(fileContent, 'motorola_checkout_fiddler_config.farx')
  
})