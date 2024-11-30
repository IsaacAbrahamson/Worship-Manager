import { Schema, Types, model } from 'mongoose'
import { DataTypes, Model, Sequelize } from 'sequelize'

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/worship_manager')

interface IPerson {
  first_name: string
  last_name: string
  email: string
  userId: Types.ObjectId
}

const person = sequelize.define<Model<IPerson>>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
  },
);

const personSchema = new Schema<IPerson>({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Person = model('Person', personSchema)
export default Person