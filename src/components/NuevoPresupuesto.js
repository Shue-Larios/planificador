import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { globalStyle } from '../styles'



export const NuevoPresupuesto = ({
    presupuesto,
    setPresupuesto,
    handleNuevoPresupuesto }) => {


    // useEffect(() => {

    //     // para obtener los datos del AsyncStorage
    //     const obtenerAS = async () => {
    //        try {
    //         const valor = await AsyncStorage.getItem('prueba_as')
    //         // JSON.parse para volver hacerlo objeto
    //         console.log(JSON.parse(valor));
    //        } catch (error) {
    //         console.log(error);
    //        }
    //     }
    //     // mandamos a llamar la funcion
    //     obtenerAS()

    // }, [])




    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir Presupuesto</Text>

            <TextInput

                keyboardType='numeric'
                placeholder='Agrega tu presupuesto
                Ej. 300'
                style={styles.input}
                // con el toString lo haccemos string
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />

            <Pressable style={styles.btn}
                onPress={() => handleNuevoPresupuesto(presupuesto)}
            >
                <Text style={styles.btnTexto}>Agregar Presupuesto</Text>

            </Pressable>

        </View>
    )
}


const styles = StyleSheet.create({
    contenedor: {
        ...globalStyle.contenedor
    },
    label: {
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6',

    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    btn: {
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
    },
    btnTexto: {
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
});
