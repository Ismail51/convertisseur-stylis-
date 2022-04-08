import React, { useState, useEffect } from 'react'
import { Paper, TextField, FormControl, Select, Button, Box } from '@material-ui/core'
import "./style.css"
import axios from 'axios'

const Main = () => {
  const [text1, settext1] = useState(0);
  const [text2, settext2] = useState(0);
  const [country, setcountry] = useState([])
  const [country2, setcountry2] = useState([])
  const [value1, setvalue1] = useState("USD")
  const [value2, setvalue2] = useState("EUR")
  const [symbolList, setSymbolList] = useState(false)
  const [symbolTaux, setSymbolTaux] = useState(0)


  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    axios.get("http://data.fixer.io/api/Symbols?access_key=dad13842e26a8e067a6d6d435eb30db1").then(result => {
      setSymbolList(result.data)
    })
      ;
  }


  function convert(e) {
    e.preventDefault();

    axios.get(`https://free.currconv.com/api/v7/convert?q=${value1}_${value2}&compact=ultra&apiKey=a802757dd8a1bd9b3d5e`).then(result => {


      // console.log(result)
      const taux = Object.values(result.data)[0]
      // console.log(Object.values(symbolTaux));
      settext2(taux * parseInt(text1))
      // console.log(`https://free.currconv.com/api/v7/convert?q=${value1}_${value2}&compact=ultra&apiKey=a802757dd8a1bd9b3d5e`);

    })
  }


  return (

    <div>
      {

        symbolList ?

          <Paper className="paper">
            <h3> Convertisseur de devises</h3>
            <form onSubmit={convert}>
              <div>
                <TextField variant='outlined' value={text1 || ""} onChange={(e) => settext1(e.target.value)} autoComplete='off' />
                <FormControl className="dropdown" variant='outlined' onChange={(e) => setvalue1(e.target.value)}>

                  <Select native value={value1}>

                    {Object.keys(symbolList.symbols).map((value, index) =>
                      <option key={index} value={symbolList[value]}>{value}</option>)}
                  </Select>
                </FormControl>
              </div>

              <div>
                <TextField variant='outlined' value={text2 || ""} />
                <FormControl className="dropdown" variant='outlined' onChange={(e) => setvalue2(e.target.value)}>
                  <Select native value={value2}>
                    {Object.keys(symbolList.symbols).map((value, index) =>
                      <option key={index} value={symbolList[value]}>{value}</option>)}
                  </Select>
                </FormControl>
              </div>
              <Box sx={{ mt: 4 }}>
                <Button type='submit' variant='contained'>Convert</Button>
              </Box>
            </form>
          </Paper>
          : null
      }
    </div >
  )
}

export default Main
