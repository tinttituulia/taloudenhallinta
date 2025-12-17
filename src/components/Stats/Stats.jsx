import styles from './Stats.module.scss'
import { Line,LineChart,ResponsiveContainer,Tooltip, XAxis, YAxis,Legend, Pie, PieChart, Cell, LabelList
} from 'recharts'
import randomColor from 'randomcolor'

function Stats(props) {

  if (!props.data || props.data.length === 0) {
    return <p>Ei tilastodataa</p>
  }

  const locale = "fi-FI"
  const numberFormat = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  //  Aikajanan data (km)
  const linedata = props.data.map(item => ({
    date: new Date(item.swimDate).getTime(),
    distance: Number(item.distance),
    type: item.type
  }))

  //  Ympyrädiagrammi: kilometrit tyypeittäin
  const reducer = (resultData, item) => {
    const index = resultData.findIndex(
      arrayItem => arrayItem.type === item.type
    )

    if (index >= 0) {
      resultData[index].distance += Number(item.distance)
    } else {
      resultData.push({
        type: item.type,
        distance: Number(item.distance)
      })
    }
    return resultData
  }

  const piedata = props.data.reduce(reducer, [])

  const piecolors = randomColor({
    count: piedata.length,
    seed: 'siemenluku',
    luminosity: 'dark'
  })

  return (
    <div className={styles.stats}>
      <h2>Tilastot</h2>

      <h3>Uintimatka aikajanalla (km)</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line dataKey="distance" />
          <XAxis
            type="number"
            dataKey="date"
            domain={['dataMin', 'dataMax']}
            tickFormatter={value =>
              new Date(value).toLocaleDateString(locale)
            }
          />
          <YAxis unit=" km" />
          <Tooltip
            labelFormatter={value =>
              new Date(value).toLocaleDateString(locale)
            }
            formatter={(value, name, props) => [
              `${numberFormat.format(value)} km`,
              props.payload.type
            ]}
          />
        </LineChart>
      </ResponsiveContainer>

      <h3>Uintimatka tyypeittäin (km)</h3>
      <ResponsiveContainer height={350}>
        <PieChart>
          <Pie data={piedata} dataKey="distance" nameKey="type">
            <LabelList
              dataKey="distance"
              position="inside"
              formatter={value =>
                `${numberFormat.format(value)} km`
              }
            />
            {piecolors.map(color => (
              <Cell key={color} fill={color} />
            ))}
          </Pie>
          <Legend />
          <Tooltip
            formatter={value =>
              `${numberFormat.format(value)} km`
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Stats
