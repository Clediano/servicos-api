const Sequelize = require('sequelize');
const uuid = require('uuid/v4');
const Transaction = require('./Transaction');
const db = require('../../database');
const sequelize = db.connect();

class Document extends Sequelize.Model { };

Document.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuid()
    },
    oid_document: {
        type: Sequelize.STRING,
        allowNull: false
    },
    transaction_id: {
        type: Sequelize.UUID,
        references: {
            model: Transaction,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
},
    {
        sequelize,
        modelName: 'document'
    }
);

Document.belongsTo(Transaction, { foreignKey: 'transaction_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

module.exports = Document;
