import React, { useEffect } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { globalStyle } from '../styles'
import { useState } from 'react'

export const FormularioGasto = ({
    setModal,
    handleGasto,
    gasto,
    setGasto,
    eliminarGasto }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    // identificamos si vamos a editar o creando nuevo registro
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');


    useEffect(() => {
        if (gasto?.nombre) {
            setNombre(gasto.nombre);
            setCantidad(gasto.cantidad);
            setCategoria(gasto.categoria);
            setId(gasto.id);
            setFecha(gasto.fecha);
        }
    }, [gasto])



    return (
        <SafeAreaView style={styles.contenedor}>
            {/* cuidado con el scroll ya que quita parte del diseño */}
            <ScrollView>
                <View style={styles.contenedorBotones}>
                    <Pressable style={[styles.btn, styles.btnCancelar]}
                        onPress={() => {
                            setGasto({})
                            setModal(false)
                        }}
                    >
                        <Text style={styles.btnTexto}>Cancelar</Text>
                    </Pressable>

                    { !!id && (
                        <Pressable style={[styles.btn, styles.btnEliminar]}
                        onPress={() => {
                            eliminarGasto(id)
                        }}
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>

                    ) }
                    
                </View>


                <View style={styles.formulario}>

                    <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Gasto</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre del garto. ej. Comida'
                            value={nombre}
                            onChangeText={setNombre}
                        />
                    </View>
                    <View style={styles.campo}>
                        <Text style={styles.label}>Cantidad Gasto</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='cantidad del garto. ej. 300'
                            keyboardType='numeric'
                            value={cantidad}
                            onChangeText={setCantidad}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Categoria Gasto</Text>
                        <Picker
                            selectedValue={categoria}
                            onValueChange={(valor) => {
                                setCategoria(valor)
                            }
                            }
                            style={styles.input}
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

                    <Pressable
                        style={styles.submitBtn}
                        onPress={() => {
                            handleGasto({ nombre, cantidad, categoria, id, fecha })
                        }}

                    >
                        <Text style={styles.submitBtnTexto}>{gasto?.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}


const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#1E40AF',
        flex: 1,

    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        padding: 10,
        marginTop: 20,
        borderRadius: 15,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancelar: {
        backgroundColor: '#DB2777',

    },
    btnEliminar: {
        backgroundColor: 'red',

    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },
    formulario: {
        ...globalStyle.contenedor,
        // para dar espacio entre el boton y el teclado cuando hace scroll
        marginBottom: 55,
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B'
    },
    campo: {
        marginVertical: 10
    },
    label: {
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 20,

        borderRadius: 15,
    },
    submitBtnTexto: {
        textAlign: 'center',
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',

    }
});
