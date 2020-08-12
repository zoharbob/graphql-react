import React from 'react';
import {Modal} from 'antd';

const Dialog = ({ children, title, visible, onOk, onCancel }) => {
    
    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={onOk}
        >
            {children}
        </Modal>
    )
}

export default Dialog;