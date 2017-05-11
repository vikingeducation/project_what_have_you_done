const doc = document;

doc.onreadystatechange = function () {
  if (doc.readyState === "interactive") {
    _initApplication();
  }
}

const _initApplication = () => {
  _registerListeners();
  _updateUi();
}

const _updateUi = () => {
  _updateBillsUi();
}

const _updateBillsUi = () => {
  const bills = doc.querySelectorAll("[class*=js-vote-]")

  Array.from(bills).forEach(bill => {
    let classList = bill.classList;

    if(classList.contains('js-vote-Nay')) {
      classList.add('card--red');
    } else if(classList.contains('js-vote-Yea')) {
      classList.add('card--green');
    }
  });
}

const _registerListeners = () => {
  _addKeyUpHandler('.js-inputZipNumber');
}

const _addKeyUpHandler = (selector) => {
  doc.querySelector('body').addEventListener('keyup', e => {
    if(e.target && e.target.matches(selector)) {
      const handler = selector.split('.js-')[1];

      _handlers[handler](e.target);
    }
  });
}

const _inputZipNumber = () => {
  const inputZipNumbers = Array.from(doc.querySelectorAll('.js-inputZipNumber'))

    inputZipNumbers.forEach((node, index, array) => {
      node.addEventListener('keyup', e => {
        const next = array[index + 1]

        if(Number(e.key)) {
          e.target.value = e.key;
        }

        if(next && e.target.value && e.key !== 'Tab') {
          array[index + 1].focus();
        }
      })
   });

  const zip = inputZipNumbers.reduce((zip, node) => zip += node.value, '')

  if(zip.length === inputZipNumbers.length) {
    _allowSubmitZip(zip);
  } else {
    _disallowSubmitZip();
  }
}

const _allowSubmitZip = (zip) => {
  const submitButton = doc.querySelector('.js-submitZip')

  submitButton.classList.remove('hide');

  submitButton.search = `zip=${zip}`
}

const _disallowSubmitZip = () => {
  const submitButton = doc.querySelector('.js-submitZip')

  submitButton.classList.add('hide');
}

const _handlers = {
  'inputZipNumber': _inputZipNumber
}
