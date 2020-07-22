import React, {useEffect} from 'react';
import {Button, Select, Checkbox, Col, Row, InputNumber, Slider} from 'antd';
import {useSelector} from "../../types/main";
import {useDispatch} from "react-redux";
import * as Actions from "../../store/actions";

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

const Navbar = (): JSX.Element => {
    const dispatch = useDispatch();
    const countries = useSelector(main => main.main.countries);
    const types = useSelector(main => main.main.types);
    const ratings = useSelector(main => main.main.ratings);
    const reviews_amounts = useSelector(main => main.main.reviews_amounts);
    const min_prices = useSelector(main => main.main.min_prices);
    const filters = useSelector(main => main.main.filters);

    const clearFilter = () => {
        dispatch(Actions.setClearFilter())
    }

    const setFilter = () => {
        dispatch(Actions.setFilterHotels())
    }

    const onChangeCountry = (value: string) => {
        dispatch(Actions.setFilter('country', value))
    }

    const onChangeType = (value: string[]) => {
        dispatch(Actions.setFilter('type', value))
    }

    const onChangeRating = (value: string[]) => {
        dispatch(Actions.setFilter('rating', value))
    }

    const onChangeReviews = (value: string | number | undefined) => {
        if (typeof value !== undefined) {
            dispatch(Actions.setFilter('reviews_amount', Number(value)))
        }
    }

    const onChangePrise = (value: number) => {
        dispatch(Actions.setFilter('min_price', value))
    }

    useEffect(() => {
        if (filters.min_price === 0 && min_prices.length >0) {
            dispatch(Actions.setFilter('min_price', min_prices[0]))
        }
    }, [min_prices, filters.min_price, dispatch])

    return <div className='p-3 flex-column'>

		<Button type="primary" className='mb-4' onClick={clearFilter}>Очистить фильтр</Button>

		<div className='w-100 flex-column mb-4'>
            <p>Страна:</p>
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Выбирите страну"
                optionFilterProp="children"
                onChange={onChangeCountry}
                value={filters.country}
            >
                {countries.map((country, index): JSX.Element => <Option key={index} value={country}>{country}</Option>)}
            </Select>
		</div>

        <div className='w-100 flex-column mb-4'>
            <p>Тип:</p>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Выбирете тип"
                onChange={onChangeType}
                value={filters.type}
            >
                {types.map((type, index): JSX.Element => <Option key={index} value={type} label={type}>{type}</Option>)}
            </Select>
        </div>

        <div className='w-100 flex-column mb-4'>
            <p>Звезды:</p>
            <CheckboxGroup
                value={filters.rating.map((item) => item.toString())}
                // @ts-ignore
                onChange={onChangeRating}
                className='flex flex-column'
            >
                <Row>
                    {ratings.map((item, index) => {
                        return <Col span={16} key={index}>
                            <Checkbox value={item.toString()}>{item.toString()}</Checkbox>
                        </Col>
                    })}
                </Row>
            </CheckboxGroup>
        </div>

        <div className='flex-column mb-4'>
            <p>Количество отзывов от:</p>
            <InputNumber
                min={0}
                max={reviews_amounts.length > 0 ? reviews_amounts[0] : 0}
                defaultValue={0}
                onChange={onChangeReviews}
                value={filters.reviews_amount}
                className='w-100'/>
        </div>

        <div className='w-100 flex-column mb-4'>
            Цена до:
            <div className='w-100 row'>
                <div className='col-2'>
                    {min_prices.length > 0 ? min_prices[min_prices.length - 1] : 0}
                </div>
                <div className='col-6'>
                    <Slider
                        max={min_prices.length > 0 ? min_prices[0] : 0}
                        min={min_prices.length > 0 ? min_prices[min_prices.length - 1] : 0}
                        onChange={onChangePrise}
                        value={filters.min_price}
                    />
                </div>
                <div className='col-2'>
                    {min_prices.length > 0 ? min_prices[0] : 0}
                </div>
            </div>
        </div>

        <Button type="primary" onClick={setFilter}>Применить фильр</Button>
    </div>
}


export default Navbar;
