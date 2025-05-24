import React from 'react';
import GuardianAiSidebar from '../Sidebars/GuardianAiSidebar';
import GuardianAiScreen from '../Screens/GuardianAiScreen';

const GuardianAiLayout = () => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='basis-17/100'>
                    <GuardianAiSidebar/>
                </div>
                <div className='basis-83/100'>
                    <GuardianAiScreen/>
                </div>
            </div>
        </div>
    );
};

export default GuardianAiLayout;