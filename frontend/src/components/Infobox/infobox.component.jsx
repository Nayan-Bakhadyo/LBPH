import React from 'react';
import './infobox.component.css';
import { Card, CardContent, Typography } from '@mui/material';

export default function InfoBox({ title, cases,casesType, total, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            style={{ width: 350, height:112, cursor:"pointer" }}>
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">{title}</Typography>
                <h3 className={title=='Recovered'? 'infoBox__cases_recovered': 'infoBox__cases'}>{cases}+</h3>
                <Typography className='infoBox__total'>{total} Total</Typography>
            </CardContent>
        </Card>
    );
}
