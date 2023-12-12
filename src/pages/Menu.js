import React from 'react';
import { View, ScrollView } from 'react-native';
import MenuDish from '../components/MenuDish';
import BottomNavigationBar from '../components/BottomNavigationBar';
import FilterForm from "../components/FilterForm";
import {useDispatch, useSelector} from 'react-redux';
import { loadDishes} from '../slices/Dishes';
import {loadTags} from "../slices/Tags";
import {loadDiets} from "../slices/Diets";

export default function Menu({ navigation }) {

    const dispatch = useDispatch();
    const dishes = useSelector(state => state.dishes.value)
    const tags = useSelector(state => state.tags.value)
    const diets = useSelector(state => state.diets.value)

    const handleQueryChange = (query) => {
        dispatch(loadTags());
        dispatch(loadDiets());
        dispatch(loadDishes(query));
    };

    return (
        <View className="flex-1">
            <ScrollView>
                <View className="mx-5 xl:mx-20">
                    <FilterForm
                        onQueryChange={handleQueryChange}
                        tags={tags}
                        diets={diets}
                        sortingMethods={{PRICE: "Prix",NAME: "Nom"}}
                        sortOrder='asc'
                    />
                    <View className="flex flex-row flex-wrap w-full items-stretch">
                        {dishes.map((dish) => {
                            return (
                                <MenuDish
                                    id={dish.id}
                                    key={dish.id}
                                    navigation={navigation}
                                    name={dish.name}
                                    image={dish.image}
                                    description={dish.description}
                                    alergens={dish.alergens}
                                    price={dish.price}
                                />
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
            <BottomNavigationBar className="absolute bottom-0 left-0 right-0" navigation={navigation}/>
        </View>
    );
}