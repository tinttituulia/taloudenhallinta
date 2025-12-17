import styles from './ItemForm.module.scss'
import useForm from '../../shared/useform/useform'
import Button from '../../shared/buttons'
import { useNavigate } from 'react-router-dom'

function ItemForm(props) {
  const navigate = useNavigate()

  const submit = () => {
    const storedValues = {
      ...values,
      distance: parseFloat(values.distance),
      id: values.id ? values.id : crypto.randomUUID()
    }

    props.onItemSubmit(storedValues)
    navigate(-1)
  }

  const initialState = props.formData ? props.formData : {
    type: "",
    distance: "",
    swimDate: ""
  }

  const { values, handleChange, handleSubmit } =
    useForm(submit, initialState, false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleDelete = () => {
    props.onItemDelete(values.id)
    navigate(-1)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.itemform}>

        <div className={styles.itemform_row}>
          <div>
            <label htmlFor="type">Uintityyppi</label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              value={values.type}
            >
              <option value="">(valitse)</option>
              {props.typelist.map(type =>
                <option key={type} value={type}>{type}</option>
              )}
            </select>
          </div>
        </div>

        <div className={styles.itemform_row}>
          <div>
            <label htmlFor="distance">Matka (km)</label>
            <input
              id="distance"
              type="number"
              name="distance"
              step="0.01"
              onChange={handleChange}
              value={values.distance}
            />
          </div>

          <div>
            <label htmlFor="swimDate">Päivämäärä</label>
            <input
              id="swimDate"
              type="date"
              name="swimDate"
              onChange={handleChange}
              value={values.swimDate}
            />
          </div>
        </div>

        <div className={styles.itemform_row}>
          <div>
            <Button onClick={handleCancel}>PERUUTA</Button>
          </div>

          <div>
            <Button
              primary
              type="submit"
              disabled={
                !values.type ||
                !values.distance ||
                !values.swimDate
              }
            >
              {props.formData ? "TALLENNA" : "LISÄÄ"}
            </Button>
          </div>
        </div>

        {props.onItemDelete &&
          <div className={styles.itemform_row}>
            <div>
              <Button secondary onClick={handleDelete}>
                POISTA
              </Button>
            </div>
          </div>
        }

      </div>
    </form>
  )
}

export default ItemForm
