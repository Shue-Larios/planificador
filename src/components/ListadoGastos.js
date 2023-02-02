import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Gasto } from './Gasto'

export const ListadoGastos = ({ filtro,
    gastosFiltrados,
    gastos,
    setModal,
    setGasto }) => {
    return (

        <View style={styles.contenedor}>

            <Text style={styles.titulo}>Gastos</Text>

            {/* para mostrar los gastos con filtro */}
            {filtro
                ? gastosFiltrados.map(gasto => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setModal={setModal}
                        setGasto={setGasto}
                    />
                ))
                : gastos.map(gasto => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setModal={setModal}
                        setGasto={setGasto}
                    />
                ))
            }
            {/* poner esto asi ( gastosFiltrados.length === 0) dice evaluar aparte y que tiene que estar vacio pero que tiene que tener un filtro aplicado
*/}
            {/* 
{ console.log('gastos',gastos) }
{ console.log('gastosFiltrados',gastosFiltrados) }
{ console.log('filtro',filtro) } */}

            {(gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
                <Text style={styles.noGastos}>No Hay Gastos</Text>
            )}


            {/* una de las formas para mostrar todos los gastos sin filtro */}
            {/* {gastos.length === 0
                ? <Text style={styles.noGastos}>No hay Gastos</Text>
                : gastos.map(gasto => (
                    <Gasto
                        key={gasto.id}
                        gasto={gasto}
                        setModal={setModal}
                        setGasto={setGasto}
                    />
                ))
            } */}
        </View>
    )
}


const styles = StyleSheet.create({
    contenedor: {
        marginTop: 20,
        marginBottom: 100
    },
    titulo: {
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20,

    },
    noGastos: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    },
});
