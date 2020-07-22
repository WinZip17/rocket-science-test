import React from 'react';
import {Button, Table} from 'antd';
import {useSelector} from "../../types/main";

const FiltersHotel = (): JSX.Element => {

	const hotels = useSelector(main => main.main.filtersHotelsList);

	const columns = [
		{
			title: 'Название',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: '',
			key: 'action',
			render: (row: any) => <Button>Забронировать</Button>,
		},
	];

	return <div className='text-center p-4'>
		{hotels.length > 0 ? <Table dataSource={hotels} columns={columns} pagination={{pageSize : 3}} /> : <h2>Записей не найдено</h2>}
	</div>
}


export default FiltersHotel;
