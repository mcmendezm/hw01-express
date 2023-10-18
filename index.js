const yargs = require('yargs');
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const argv = yargs
  .command('list', 'List all contacts')
  .command('get', 'Get a contact by ID', {
    id: {
      describe: 'Contact ID',
      demand: true,
      string: true,
    },
  })
  .command('add', 'Add a new contact', {
    name: {
      describe: 'Contact name',
      demand: true,
      string: true,
    },
    email: {
      describe: 'Contact email',
      demand: true,
      string: true,
    },
    phone: {
      describe: 'Contact phone',
      demand: true,
      string: true,
    },
  })
  .command('remove', 'Remove a contact by ID', {
    id: {
      describe: 'Contact ID',
      demand: true,
      string: true,
    },
  })
  .help().argv;

function invokeAction(argv) {
  const { action, id, name, email, phone } = argv;

  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.log('Unknown action type!');
  }
}

invokeAction(argv);
