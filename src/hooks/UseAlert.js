import { useState } from 'react';

const UseAlert = () => {
    const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' })

    const showAlert = ({ text, type = 'danger' }) => {
        setAlert({ show: true, text, type });
        setTimeout(() => {
            hideAlert();
        }, 3000);
    };

    const hideAlert = () => {
        setAlert({ show: false, text: '', type: 'danger' });
    };

    return { alert, showAlert, hideAlert };
};

export default UseAlert;