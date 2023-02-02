import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyle } from '../styles';
import { Picker } from '@react-native-picker/picker';


export const Filtro = ({ gastos, filtro, setFiltro, setGastosFiltrados }) => {


    useEffect(() => {
        if (filtro === '') {
            setGastosFiltrados([]);
        } else {
            const GastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(GastosFiltrados);

        }
        // cada que cambie filtro se va a ejecutar
    }, [filtro])




    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Filtrar Gastos</Text>

            <View style={styles.campo}>
                <Picker
                    selectedValue={filtro}
                    // el valor es el mismo value del picker.item
                    onValueChange={(valor) => {
                        setFiltro(valor)
                    }}
                >
                    <Picker.Item label='-- Seleccione --' value='' />
                    <Picker.Item label='Ahorro' value='ahorro' />
                    <Picker.Item label='Comida' value='comida' />
                    <Picker.Item label='Casa' value='casa' />
                    <Picker.Item label='Gastos Varios' value='gastos' />
                    <Picker.Item label='Ocio' value='ocio' />
                    <Picker.Item label='Salud' value='salud' />
                    <Picker.Item label='Suscripciones' value='suscripciones' />
                </Picker>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    contenedor: {
        ...globalStyle.contenedor,
        transform: [{ translateY: 0 }],
        marginTop: 80
    },
    label: {
        fontSize: 22,
        fontWeight: '900',
        color: '#64748B'
    },
    pressable: {
        position: 'absolute',
        width: 60,
        height: 60,
        bottom: 15,
        right: 15,
        borderRadius: 50
    },
    imagen: {
        width: 60,
        height: 60,
    }
});