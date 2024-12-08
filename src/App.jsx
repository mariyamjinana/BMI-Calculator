import { useState } from 'react';
import './App.css'

function App() {
  const [bmi, setBMI] = useState(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [category, setCategory] = useState('');
  const [isWeight, setIsWeight] = useState(true)
  const [isHeight, setIsHeight] = useState(true)

  const validate = (e) => {
    const { name, value } = e.target;

    // Check if the value is a valid number (can include decimals)
    if (value.match(/^\d*\.?\d*$/)) { // This regex allows both integers and decimals
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(true)
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(true)
      }
    } else {
      // Clear the input if it's invalid
      if (name === 'weight') {
        setWeight(value);
        setIsWeight(false)
      } else if (name === 'height') {
        setHeight(value);
        setIsHeight(false)
      }
    }
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setCategory('');
    setIsHeight(true)
    setIsWeight(true)
  };

  const calculateBMI = () => {

    // Calculate BMI and round it to 2 decimal places
    const bmiValue = (weight / (height ** 2)).toFixed(2);
    setBMI(bmiValue);

    // Determine the BMI category
    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obese');
    }
  };

  return (
    <div className='bg-black d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
      <div className='bg-light p-5 rounded-2 text-center' style={{ width: '500px' }}>
        <h1>Calculate your BMI</h1>
        <p>Body mass index is used to determine whether you are in a healthy weight range for your height.</p>

        <div className='bg-primary d-flex justify-content-center align-items-center p-3 rounded mt-4 flex-column text-white' style={{ height: '150px' }}>
          <h1>{bmi || 0}</h1>
          <h3>Your BMI</h3>
          <p>{category || 'Enter your details to see your category'}</p>
        </div>

        <div className='mt-4'>
          <input type="text" className='form-control p-3' placeholder='Enter Weight (KG)' required name='weight' value={weight} onChange={(e) => validate(e)} />
          {isWeight == false && <p className='text-danger m-0'>*Invalid Input</p>}
          <input type="text" className='form-control mt-3 p-3' placeholder='Enter Height (M)' required name='height' value={height} onChange={(e) => validate(e)} />
          {isHeight == false && <p className='text-danger'>*Invalid Input</p>}
          <div>
            <button className='btn btn-success mt-3 p-2 rounded-0 me-2' style={{ width: '190px' }} onClick={calculateBMI} disabled={isHeight && isWeight ? false : true}>Calculate </button>
            <button className='btn btn-danger mt-3 p-2 rounded-0' style={{ width: '190px' }} onClick={handleReset}>Reset </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
