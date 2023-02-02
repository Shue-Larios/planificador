// importamos el AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ControlPresupuesto } from './src/components/ControlPresupuesto';
import { Filtro } from './src/components/Filtro';
import { FormularioGasto } from './src/components/FormularioGasto';
import { Header } from './src/components/Header';
import { ListadoGastos } from './src/components/ListadoGastos';
import { NuevoPresupuesto } from './src/components/NuevoPresupuesto';
import { generarId } from './src/helpers';




const App = () => {

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);

  const [gastos, setGastos] = useState([]);

  const [modal, setModal] = useState(false)

  // este se llena cuando presionamos en los gastos para visualizarlos
  const [gasto, setGasto] = useState({});

  // state para el filtro
  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState({});

  // useEffect(() => {
  //   // para almacenar en el AsyncStorage
  //   const almacenarAS = async () => {
  //     // const nombre = 'shue'
  //     const nombre = [1,2,3]

  //     // la primera es la llave la segunda el valor
  // JSON. stringify() convierte un objeto o valor en una cadena de texto JSON
  //     await AsyncStorage.setItem('prueba_as', JSON.stringify(nombre))
  //     console.log('almacenado');
  //   }
  //   // mandamos a llamar la funcion
  //   almacenarAS()
  // }, [])


  useEffect(() => {
    //  para obtener el presupuesto
    const obtenerPresupuestoStorage = async () => {
      // const nombre = 'shue'
      try {
        // la primera es la llave la segunda el valor
        // ?? 0 le digo que si no exite viene null o algo asi le asigne cero
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        if (presupuestoStorage > 0) {
          // cambiamos el valor del presupuesto con el presupuesto del storage
          setPresupuesto(presupuestoStorage);
          // como ya es valido lo ponemos true
          setIsValidPresupuesto(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
    obtenerPresupuestoStorage()
  }, [isValidPresupuesto])



  // guardar el presupeusto en el Storage
  useEffect(() => {
    if (isValidPresupuesto) {
      const guardarPresupuestoStorage = async () => {
        // const nombre = 'shue'
        try {
          // la primera es la llave la segunda el valor
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error);
        }
      }
      guardarPresupuestoStorage()
    }
  }, [isValidPresupuesto])


  // obtener los gastos del Storage
  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        // la primera es la llave la segunda el valor
        // ?? [] le digo que si no exite viene null o algo asi le asigne arreglo vacio le quito esta opcion aca xk abajo se la pongo en la decision
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')

        // como lo requiero como arreglo le pongo asi
        setGastos(gastosStorage
          // si esta variable viene como verdadera
          ? JSON.parse(gastosStorage)
          // sino entoncs pone un arreglo vacio
          : []
        )
      } catch (error) {
        console.log(error);
      }
    }
    obtenerGastosStorage()
  }, [])



  // almacenar los gastos en storage
  useEffect(() => {
    const guardarGastosStorage = async () => {
      try {
        // la primera es la llave la segunda el valor
        // JSON. stringify() convierte un objeto o valor en una cadena de texto JSON

        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error);
      }
    }
    guardarGastosStorage()
  }, [gastos])


  const handleNuevoPresupuesto = (presupuesto) => {
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'Presupuesto no puede ser 0 o menor', [{ text: 'OK' }]);
    }
  }

  // funcion para valir
  const handleGasto = gasto => {

    // para revisar los valores de un objeto
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      // lo dejo sin botones ya q si solo hay uno el ok es x default
      Alert.alert('Error', 'Todos los campos son obligatorios'
      )
      return
    }

    if (gasto.id) {
      // console.log('edicion');
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id
        ? gasto
        : gastoState
      )

      setGastos(gastosActualizados);

    } else {
      // console.log('creando');
      // añadir nuevo gasto al estate
      gasto.id = generarId();
      gasto.fecha = Date.now();

      setGastos([...gastos, gasto]);
    }

    // ocultar el modal
    setModal(!modal);
  }


  const eliminarGasto = id => {
    Alert.alert('¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [{ text: 'No', style: 'cancel' },
      {
        text: 'Si, Eliminar', onPress: () => {
          const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id);
          setGastos(gastosActualizados);
          setModal(!modal);
          setGasto({})
        }
      }
      ]);

  }

  const resetearAPP = () => {
    Alert.alert(
      '¿Deseas reiniciar la App?',
      'Esto eliminara presupuesto y gastos',
      [{ text: 'No', style: 'cancel' },
      {
        text: 'Si, Eliminar', onPress: async () => {
          // para resetear todo
          try {
            await AsyncStorage.clear();
            // una ves reiniciada lo mandamos a pantalla inicial
            setIsValidPresupuesto(false);
            setPresupuesto(0);
            setGastos([]);
          } catch (error) {
            console.log(error);
          }
        }
      }
      ]);
  }

  return (

    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {/* conmponente con dos si es verdadero o falso */}
          {isValidPresupuesto
            ? <ControlPresupuesto
              presupuesto={presupuesto}
              gastos={gastos}
              resetearAPP={resetearAPP}
            />
            : <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          }
        </View>

        {isValidPresupuesto && (
          <>
            <Filtro
              filtro={filtro}
              setFiltro={setFiltro}
              gastos={gastos}
              setGastosFiltrados={setGastosFiltrados}
            />

            <ListadoGastos
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
            />
          </>
        )}

      </ScrollView>
      {/* condicion para mostral el modal */}
      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
          onRequestClose={() => {
            setModal(!modal)
          }}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {/* componente solo con el lado verdadero */}
      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image
            style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#F5F5F5',
    flex: 1
  },
  header: {
    backgroundColor: '#3B82F6',
    minHeight: 400
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

export default App;
