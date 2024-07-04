import React,{ useState} from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import styles from './StepAvatar.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAvatar } from '../../../store/activateSlice'
import { activate } from '../../../http'
import {setAuth} from '../../../store/authSlice'
import Loader from '../../../components/shared/Loader/Loader'

const StepAvatar = ({onNext}) => {
  const dispatch = useDispatch();
  const {name,avatar} = useSelector((state)=>state.activate);

  const [image,setImage] = useState('/images/monkey.png');
  const [loading, setLoading] = useState(false);
 

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      // console.log(reader.result);
      setImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
    
}
  async function submit(){
    
    setLoading(true);
    try {
      const { data } = await activate({ name, avatar });
      if (data.auth) {
     
          dispatch(setAuth(data));
        
       
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }
// will run when the component is unmounted
  // useEffect(()=>{
  //   return ()=>{
  //     setUnMounted(true);

  //   }
  // },[]);

  if(loading) return <Loader message="Activation in progress.."/>
  return (
    <>
    <Card title={`Okay, ${name}`} icon="monkey">
      <p className={styles.subHeading}>How’s this photo?</p>

      <div className={styles.avatarWrapper}>
        <img className={styles.avatarImage} src={image} alt="avatar" />

      </div>

      <div>
        <input
         onChange={captureImage}
         id='avatarInput' 
         type="file" 
         className={styles.avatarInput}
         />


        <label className={styles.avatarLabel} htmlFor="avatarInput">
          Choose Your different Photo!
        </label>

      </div>
        <div>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>

    
    </>
  )
}

export default StepAvatar