import React from 'react'
import CustomePrimaryButton from '../../shared/components/CustomePrimaryButton'
import RedirectInfo from '../../shared/components/RedirectInfo'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'


const getFormNotValidMessage = () => {
    return "Username should have between 3 to 12 character and password should be  between 6 to 12 character";
};

const getFormValidMessage = () => {
    return "Press to Registe!";
};

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
    const history = useNavigate();
    const handlePushToLoginPage = () => {
        history("/login");
    };


    return (
        <>
            <Tooltip title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>

                <div>
                    <CustomePrimaryButton
                        label="Register"
                        additionalStyles={{ marginTop: '30px' }}
                        disabled={!isFormValid}
                        onClick={handleRegister}
                    />
                </div>
                
            </Tooltip>
            <RedirectInfo
                text=""
                redirectText="Already have an account?"
                additionalStyles={{ marginTop: '5px' }}
                redirectHandler={handlePushToLoginPage}
            />
        </>
    )
}

export default RegisterPageFooter