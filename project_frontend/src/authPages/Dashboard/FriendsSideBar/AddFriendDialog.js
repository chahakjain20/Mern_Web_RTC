import React, { useEffect, useState } from 'react'
import { validateMail } from '../../../shared/utils/validators'
import { Dialog, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputWithLabel from '../../../shared/components/InputWithLabel'
import CustomePrimaryButton from '../../../shared/components/CustomePrimaryButton';

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
    sendFriendInvitation = () => { }
}) => {

    const [mail, setMail] = useState('');
    const [isFormValid, setIsFormValid] = useState('');

    const handleSendInvitation = () => {
        //send friend request to serveer
    }

    const handleCloseDialog = () => {
        closeDialogHandler();
        setMail('');
    };

    useEffect(() => {
        setIsFormValid(validateMail(mail));
    }, [mail, setIsFormValid]);


    return (
        <div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>
                    <Typography>
                        Invite a Friend
                    </Typography>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        <Typography>Enter email- address of friend which you would like to invite</Typography>
                    </DialogContentText>
                    <InputWithLabel
                        label='Mail'
                        type='text'
                        value={mail}
                        setValue={setMail}
                        placeholder="Enter e-mail address"

                    />

                </DialogContent>

                <DialogActions>
                    <CustomePrimaryButton
                        onClick={handleSendInvitation}
                        disabled={!isFormValid}
                        label='Send'
                        additionalStyles={{
                            marginLeft: "15px",
                            marginRight: '15px',
                            marginBottom: '10px',

                        }}


                    />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddFriendDialog