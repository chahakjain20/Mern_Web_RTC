import React from 'react'
import CustomePrimaryButton from '../../shared/components/CustomePrimaryButton'
import RedirectInfo from '../../shared/components/RedirectInfo'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'


const getFormNotValidMessage = () => {
    return "Please enter a correct e-mail address, and the password should be between 6 to 12 characters";
};

const getFormValidMessage = () => {
    return "Press to Log-In";
};

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
    const history = useNavigate();
    const handlePushToRegisterPage = () => {
        history("/register");
    };


    return (
        <>
            <Tooltip title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}>

                <div>
                    <CustomePrimaryButton
                        label="Log-In"
                        additionalStyles={{ marginTop: '30px' }}
                        disabled={!isFormValid}
                        onClick={handleLogin}
                    />
                </div>
                
            </Tooltip>
            <RedirectInfo
                text="Need an account?"
                redirectText="Create an account"
                additionalStyles={{ marginTop: '5px' }}
                redirectHandler={handlePushToRegisterPage}
            />
        </>
    )
}

export default LoginPageFooter