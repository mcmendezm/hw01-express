const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function generateUniqueId() {
  return Date.now().toString();
}

function listContacts() {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);

    if (contact) {
      console.table([contact]);
    } else {
      console.log('Contact not found');
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    let contacts = JSON.parse(data);
    const contactIndex = contacts.findIndex((c) => c.id === contactId);

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);

      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
        if (error) {
          console.error(error);
          return;
        }
        console.log('Contact removed successfully.');
      });
    } else {
      console.log('Contact not found');
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      return;
    }

    const contacts = JSON.parse(data);

    const newContact = {
      id: generateUniqueId(), // Utiliza la función generateUniqueId para generar un ID único
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log('Contact added successfully.');
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
