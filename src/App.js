
import { useState } from 'react';
import './App.css';

import 'react-circular-progressbar/dist/styles.css';
import GaugeChart from 'react-gauge-chart'
import { CSSTransition } from 'react-transition-group';
import Swal from 'sweetalert2'
import ReactDOMServer from 'react-dom/server';
import withReactContent from 'sweetalert2-react-content'
import ReactPlayer from 'react-player';


function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('0.75');
  const [health, setHealth] = useState('')
  const [bmiresult, setBmihealth] = useState('')
  const [showsuggestion, setshowsuggestion] = useState(false)
  const[advice,setadvice]= useState('')
  const[adviceclip,setadviceclip] = useState('')
  const [showresult, setshowresult] = useState(false)
  const [displyclass, setdisplayclass] = useState('row mx-1 setmiddle')
  // eslint-disable-next-line
  const [showbmicomp, setshowbmicomp] = useState(true)
  const MySwal = withReactContent(Swal)


  const calculateBmi = () => {

    if (age > 100 || weight > 150 || age < 0 || weight < 0||height<0 ||height>220) {
      MySwal.fire({
        title: <strong>Inputs are not relevent</strong>,
        html: <i> <ReactPlayer
          url={process.env.PUBLIC_URL + '/warning.mp4'}
          width="100%"
          height="80%"
          controls={true}
          playing={true}
        /></i>,
        icon: 'warning',
        customClass: {
          popup: 'custom-popup-class', // Add your custom class here
        },
      })
      return
    }
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // Convert height from cm to m
    const calculatedBmi = weightInKg / (heightInM * heightInM);
    setBmi(calculatedBmi.toFixed(2)); // Limit to two decimal places

    if (calculatedBmi < 16) {
      setHealth('Severe Thinness')
      setBmihealth('0.1')
      setshowsuggestion(true)
      setadvice('Stop')
      setadviceclip('./nismja.mp4')
    } else if (calculatedBmi >= 16 && calculatedBmi <= 17) {
      setHealth('Moderate Thinness')
      setBmihealth('0.15')
      setshowsuggestion(true)
      setadvice('Stop')
      setadviceclip('./nismja.mp4')
    } else if (calculatedBmi > 17 && calculatedBmi <= 18.5) {
      setHealth('Mild Thinness')
      setBmihealth('0.16')
      setshowsuggestion(true)
      setadvice('Stop')
      setadviceclip('/nismja.mp4')
    } else if (calculatedBmi > 18.5 && calculatedBmi <= 25) {
      setHealth('Normal')
      setBmihealth('0.22')
      setshowsuggestion(true)
      setadvice("CHAD Cant Say Any Thing!")
      setadviceclip('/chad.mp4')
    } else if (calculatedBmi > 25 && calculatedBmi <= 30) {
      setHealth('Overweight')
      setBmihealth('0.40')
      setshowsuggestion(true)
      setadviceclip('./tootgya.mp4')
      setadvice('Main to toot gya yaar!')
    } else if (calculatedBmi > 30 && calculatedBmi <= 35) {
      setHealth('Obese Class I')
      setBmihealth('0.6')
      setshowsuggestion(true)
      setadviceclip('./nahopayega.mp4')
      setadvice('Na Ho Payega!')
    } else if (calculatedBmi > 35 && calculatedBmi <= 40) {
      setHealth('Obese Class II')
      setBmihealth('0.75')
      setshowsuggestion(true)
      setadviceclip('./nahopayega.mp4')
      setadvice("Na Ho Payega!")
    } else if (calculatedBmi > 40) {
      setBmihealth('0.9')
      setHealth('Obese Class III')
      setshowsuggestion(true)
      setadviceclip('./nahopayega.mp4')
      setadvice('Na Ho Payega!')
    }

  };

  function clearAll(){
    setAge('')
    setHeight('')
    setWeight('')
    setBmi(null)
    setHealth('')
    setBmihealth('')
    setshowsuggestion(false)
    setshowresult(false)
    setdisplayclass('row mx-1 setmiddle')
    setshowbmicomp(false)
    setshowbmicomp(true)

  }

  function nosuggestion() {


    const htmlContent = ReactDOMServer.renderToString(
      <ReactPlayer
        url={process.env.PUBLIC_URL + '/validation.mp4'}
        width="100%"
        height="80%"
        controls={true}
        playing={true}
      />
    );
    Swal.fire({
      title: "Are u Sure?",
      icon: "warning",
      html:htmlContent,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'custom-popup-class', // Add your custom class here
      },
  }).then((result) => {

      if (result.isConfirmed) {
        setshowsuggestion(false)
        setdisplayclass('row mx-1 setmiddle')
       
      } else {

      }
   
  })
}

  function handleonsuggestion() {

    setshowresult(true)
    setdisplayclass('row mx-1 setleft')
    setshowbmicomp(false)
    setshowbmicomp(true)

  }

  function closecard(){
    setshowresult(false)
    setdisplayclass('row mx-1 setmiddle')
  }



  const chartData = [
    { value: 0.12, label: 'Thinness' },
    { value: 0.1, label: 'Label 2' },
    { value: 0.12, label: 'Label 3' },
    { value: 0.11, label: 'Label 4' },
    { value: 0.11, label: 'Label 5' },
    { value: 0.1, label: 'Label 6' },
  ];



  return (
    <div className='bgwall'>

      <div className={displyclass}>

        <div className="col-sm-3 sliding-in ">

          <div className="card sliding-in" style={{ marginTop: '50px' }}>
            <h5 className="card-header">BMI Calculator</h5>
            <div className="card-body" style={{ backgroundColor: 'white' }}>
              <div className='input-group mb-2'>
                <input
                  className='form-control'
                  required
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className='input-group mb-3'>
                <input
                  required
                  className='form-control'
                  type="number"
                  placeholder="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />&nbsp;&nbsp;
                <input
                  required
                  className='form-control'
                  type="number"
                  placeholder="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <span>
                <button className='btn btn-success' onClick={calculateBmi}>Calculate</button>&nbsp;&nbsp;
                <button className='btn btn-default' onClick={clearAll}>Clear</button>
              </span>
              <GaugeChart id="gauge-chart6"
                nrOfLevels={420}
                arcsLength={chartData.map((item) => item.value)}
                colors={['#bc2020',
                  '#008137', '#ffe400', '#d38888', '#bc2020'
                  , '#8a0101'
                ]}
                hideText='true'
                percent={bmiresult}
                arcPadding={0.02}
                formatTextValue={['label']}
              />
              {bmi !== null && <p>Your BMI: {bmi} kg/m2 ({health})</p>}
            </div>

            <div className='card-footer'>

              <CSSTransition
                in={showsuggestion}
                timeout={1000} // Adjust the duration as needed
                classNames="card-slide"
                unmountOnExit
              >
                <>
                  <p>Need Suggestions?</p>
                  <span>
                    <button className='btn btn-success' onClick={handleonsuggestion}>Yes</button>&nbsp;&nbsp;
                    <button className='btn btn-danger' onClick={nosuggestion}>No</button>

                  </span>
                </>
              </CSSTransition>
            </div>

          </div>

        </div>

        <CSSTransition
          in={showresult}
          timeout={1000} // Adjust the duration as needed
          classNames="card-slide"
          unmountOnExit
        >
          <div className='col-sm-4 '>
            <div className='card' style={{ marginTop: '50px' }}>
            <button
          type="button"
          className="btn btn-default"
          aria-label="Close"
          onClick={closecard} // Replace with your close logic
          style={{ position: 'absolute', top: '5px', right: '10px', zIndex: 1 }}
        ><b>X</b>
        </button>
              <h5 className="card-header" style={{ textAlign: 'center' }}>{advice} {advice === 'Stop' && '✊💦💦'} {advice ==="CHAD Cant Say Any Thing!" && "👑👑"}</h5>
              <div className='cardbody'>
                <ReactPlayer
                  url={process.env.PUBLIC_URL + adviceclip}
                  width="100%"
                  height="100%"
                  controls={true}
                  playing={true}
                />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export default App;
