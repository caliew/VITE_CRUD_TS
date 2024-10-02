import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Worker } from '../models/Worker';
import { Restaurant } from '../models/Restaurant';

interface WorkerListProps {
    restaurant: Restaurant;
}

const WorkerList = ({ restaurant }: WorkerListProps) => {
    const workersByRestaurantId = useSelector((state) => state.workers.workersByRestaurantId);
    const workers = workersByRestaurantId.filter((worker:Worker) => worker.restaurantId === restaurant.id);

    return (
    <div>
        <ul style={{ listStyleType:'', paddingLeft: 50 }}>
        {workers.map((worker:Worker) => (
            <li key={worker.id} >
                <Typography sx={{ textAlign: 'left', fontSize: 18, fontWeight: 100, color: 'black', margin: '0 10px' }}>
                {worker.name}
                </Typography>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default WorkerList;