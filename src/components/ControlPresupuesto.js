import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { formatearCantidad } from '../helpers'
import { globalStyle } from '../styles'

export const ControlPresupuesto = ({ presupuesto, gastos, resetearAPP }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
    const [porcentaje, setPorcentaje] = useState(0);



    useEffect(() => {
        // con el cero al final decimos q inicia en cero
        const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0);

        //   disponible
        const totalDisponible = presupuesto - totalGastado

        // calculando lo gastado para mostrarlo en el circulo
        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100
        );

        // despues q pase los dos segundos ejecuta el codigo
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)

        }, 1000);


        setGastado(totalGastado);
        setDisponible(totalDisponible);
    }, [gastos])



    return (
        <SafeAreaView>

            <View style={styles.contenedor}>
                <View style={styles.centrarGrafica}>
                    {/* componenten de circule progress */}
                    <CircularProgress
                        value={porcentaje}
                        duration={1000} // duracion de la animacion
                        radius={108} //est es el tamaño 
                        valueSuffix={'%'} //este es el signo 
                        title='Gastado'
                        inActiveStrokeColor='#F5F5F5' // color de la parte no activa
                        inActiveStrokeWidth={20} // groso de la linea no activa
                        activeStrokeColor='#3B82F6'
                        activeStrokeWidth={20}
                        titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
                        titleColor='#64748B'

                        // para ver el progreso del circulo de colores
                        strokeColorConfig={[
                            { color: '#3B82F6', value: 0 },
                            { color: 'yellow', value: 50 },
                            { color: 'red', value: 100 },
                        ]}

                    />
                </View>

                <View style={styles.contenedorTexto}>

                    <Pressable style={styles.boton}
                    onPress={resetearAPP}
                    >
                        <Text style={styles.textoBoton}>Reiniciar App</Text>
                    </Pressable>

                    <Text style={styles.valor}>
                        <Text style={styles.label}>Presupuesto:</Text> {''}
                        {formatearCantidad(presupuesto)}
                    </Text>

                    <Text style={styles.valor}>
                        <Text style={styles.label}>Disponible:</Text> {''}
                        {formatearCantidad(disponible)}
                    </Text>

                    <Text style={styles.valor}>
                        <Text style={styles.label}>Gastado:</Text> {''}
                        {formatearCantidad(gastado)}
                    </Text>
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    contenedor: {
        // obtengo un estilo de los globales
        ...globalStyle.contenedor
    },
    centrarGrafica: {
        alignItems: 'center'
    },
    // // tamaño de la imagen
    // imagen: {
    //     width: 250,
    //     height: 250
    // },
    contenedorTexto: {
        marginTop: 50,
    },
    boton: {
        backgroundColor: '#DB2777',
        padding: 10,
        marginBottom: 40,
        borderRadius: 15
    },
    textoBoton: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'

    },
    valor: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label: {
        fontWeight: '700',
        color: '#3B82F6'
    }
});
