import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import SortingForm from "./SortingForm";
import Icon from 'react-native-vector-icons/FontAwesome';

const FilterForm = ({ onQueryChange, tags, diets, sortingMethods, sortOrder: defaultSortOrder }) => {
    const [search, setSearch] = useState('');
    const [prices, setPrices] = useState([0, 50])
    const [selectedTags, setSelectedTags] = useState({});
    const [selectedDiets, setSelectedDiets] = useState({});
    const [selectAllTags, setSelectAllTags] = useState(false);
    const [selectAllDiets, setSelectAllDiets] = useState(false);
    const [sortType, setSortType] = useState(Object.keys(sortingMethods)[0]);
    const [sortingOrders, setSortingOrders] = useState(defaultSortOrder || 'asc');

    const handleCheckboxChange = (type, key, checked) => {
        if (type === "tags") {
            setSelectedTags(prev => ({ ...prev, [key]: checked }));
        } else {
            setSelectedDiets(prev => ({ ...prev, [key]: checked }));
        }
    };

    const handleSelectAll = (type, checked) => {
        if (type === "tags") {
            const newSelectedTags = {};
            Object.keys(tags).forEach(tag => {
                newSelectedTags[tag] = checked;
            });
            setSelectedTags(newSelectedTags);
            setSelectAllTags(checked);
        } else {
            const newSelectedDiets = {};
            Object.keys(diets).forEach(diet => {
                newSelectedDiets[diet] = checked;
            });
            setSelectedDiets(newSelectedDiets);
            setSelectAllDiets(checked);
        }
    };

    const handleSortingChange = ({ sortType, sortOrder }) => {
        setSortType(sortType);
        setSortingOrders(sortOrder);
    };

    useEffect(() => {
        handleQueryChange();
    }, [search, selectedTags, selectedDiets, sortType, sortingOrders]);

    const handleQueryChange = () => {
        const query = {
            search: search,
            lowerPrice: prices[0],
            upperPrice: prices[1],
            tags: Object.keys(selectedTags).filter(tag => selectedTags[tag]).join(','),
            diets: Object.keys(selectedDiets).filter(diet => selectedDiets[diet]).join(','),
            sortBy: sortType,
            sortOrder: sortingOrders
        };
        onQueryChange(query);
    };

    const DietSelection = ({ label, selectAll, isSelected, onPress }) => (
        <TouchableOpacity onPress={onPress} className={`mr-3 shadow p-2 rounded my-1 ${isSelected ? 'bg-[#713235]' : 'bg-white'}`}>
            <Text className={ `text-xl ${selectAll ? 'font-bold' : ''} ${isSelected ? 'text-white' : 'text-black'}`}>{label}</Text>
        </TouchableOpacity>
    );

    const TagSelection = ({ label, selectAll, isSelected, onPress }) => (
        <TouchableOpacity onPress={onPress} className={`mr-3 shadow p-2 rounded my-1 ${isSelected ? 'bg-[#713235]' : 'bg-white'}`}>
            <Text className={ `text-xl ${selectAll ? 'font-bold' : ''} ${isSelected ? 'text-white' : 'text-black'}`}>{label}</Text>
        </TouchableOpacity>
    );


    return (

        <View className="flex flex-col">
            <View className="bg-white mt-10 mb-5 p-5 shadow-xl">

                <View className="sm:w-1/4 w-full">
                    <RangeSlider
                        min={0}
                        max={50}
                        step={1}
                        value={prices}
                        onInput={setPrices}
                        onThumbDragEnd={handleQueryChange}
                    />

                    <View className="flex flex-row mt-3 mb-5">
                        <Text className="text-2xl">Prix : {prices[0]} à {prices[1]} €</Text>
                    </View>


                </View>


                <View className="flex flex-col sm:flex-row mb-5">
                    <View className="w-full sm:w-1/2">
                        <Text className="text-2xl">Régimes</Text>
                        <View className="w-full sm:w-1/2 h-1 bg-[#713235] mb-3"></View>
                        <View className="flex flex-row flex-wrap">
                            <DietSelection
                                label="Tout Selectionner"
                                selectAll={true}
                                isSelected={selectAllDiets}
                                onPress={() => handleSelectAll("diets", !selectAllDiets)}
                            />
                            {Object.entries(diets).map((diet) => (
                                <DietSelection
                                    key={diet[0]}
                                    label={diet[1]}
                                    selectAll={false}
                                    isSelected={selectedDiets[diet[0]] || false}
                                    onPress={() => handleCheckboxChange("diets", diet[0], !selectedDiets[diet[0]])}
                                />
                            ))}
                        </View>
                    </View>

                    <View className="w-full sm:w-1/2">
                        <Text className="text-2xl">Catégories</Text>
                        <View className="w-full sm:w-1/2 h-1 bg-[#713235] mb-3"></View>
                        <View className="flex flex-row flex-wrap">
                            <TagSelection
                                label="Tout Selectionner"
                                isSelected={selectAllTags}
                                selectAll={true}
                                onPress={() => handleSelectAll("tags", !selectAllTags)}
                            />
                            {Object.entries(tags).map((tag) => (
                                <TagSelection
                                    key={tag[0]}
                                    label={tag[1]}
                                    selectAll={false}
                                    isSelected={selectedTags[tag[0]] || false}
                                    onPress={() => handleCheckboxChange("tags", tag[0], !selectedTags[tag[0]])}
                                />
                            ))}
                        </View>
                    </View>
                </View>



                <SortingForm
                    sortingMethods={sortingMethods}
                    sortType={sortType}
                    sortOrder={sortingOrders}
                    onSortingChange={handleSortingChange}
                />
            </View>

            <View className="bg-white mt-5 mb-5 p-5 shadow-xl">
                <View className="flex-row items-center bg-white p-2 shadow border border-[#713235] rounded my-5">
                    <Icon name="search" size={20} color="#000" className="ml-5 mr-4" />
                    <TextInput
                        placeholder="Que souhaitez-vous manger ?"
                        value={search}
                        onChangeText={setSearch}
                        placeholderTextColor={"#808080"}
                        className="flex-1 ml-5 text-2xl"
                    />
                </View>
            </View>
        </View>



    );
};



export default FilterForm;



