import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

/*Declaración de la función que dibuja los botones cuadrados,
ésta recibe propiedades desde Board, value y onClick.*/
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
/*Declaración de la clase Board, ésta le sirve de pasarela a las 
propiedades a la función Square. También declara dentro de sí la
función local renderSquare, que es llamada luego dentro de la función
render pasando como propiedad una numeración fija, que luego servirá
tanto como índice del arreglo this.props.squares como para el 
atributo de la función onClick, ambas, el arreglo y la función, son 
propiedades que recibe del padre*/
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
/*Declaración de la clase Game

En primer momento se crea un contructor para crear un estado inicial. 
En dicho estado inicial se crea un arreglo llamado history, el cual
contiene un objeto que a su vez contiene un arreglo llamado squares.

El arreglo squares tiene nueve elementos y son ocupados con "null"
como estado inicial.

stepNumber es iniciado con valor "0".

xIsNext es iniciado con valor "true".

Luego se declara la función handleClick, ésta recibe la propiedad i, que
si recordamos la función render dentro de la clase Board, corresponde a
la numeración fija que se le pasa como atributo a la función renderSquare.

Se crea la constante local history (no confundir con el estado history) y se le
asigna como valor el resultado de hacer una sección al arreglo del estado
history inicialmente entre cero "0" y el estado stepNumber, que inicialmente
es cero, más uno "+1", dando como resultado que history sea igual al objeto 
en el índice cero "0" del estado history, es decir, un objeto con un arreglo 
de 9 elementos donde todos son igual a "null".

Se crea la constante local current, ésta será igual al elemento que se encuentre
dentro del arreglo history en el índice que se determina al restar uno "1"
a la longitud de dicho arreglo history. En este caso será el elemento cero, que
resulta en que el valor de current es el único objeto que existe hasta ahora
dentro del arreglo del estado history, objeto que contiene square lleno de 
valores "null". 

Se crea la constante local squares, ésta será igual al arreglo squares que está
dentro del objeto current.

Se condiciona si existe un ganador o si el valor guardado en el arreglo
squares en el índice i, que es la propiedad recibida por handleClick, es
diferente a "null" y si se cumple dicha condición se lanza un return 
temprano que evita que se escape del evento handleClick.

Se iguala el elemento i del arreglo squares al resultado de condicionar si
el estado xIsNext es verdadero o falso, dándole valor de "X" u "O" respec-
tivamente para cada caso.

Actualiza el valor del estado de la clase Game, en éste caso al arreglo
correspondiente al estado history se le agrega con concat un nuevo elemento
que contiene un objeto que a su vez contiene un nuevo arreglo squares, que es 
igualado al arreglo que tenemos guardado en la constante squares con la 
modificación hecha en el paso anterior en su elemento i.

El estado stepNumber se iguala a la longitud del arreglo que tenemos en la
constante history. Que para éste momento será igual a 1.

El estado xIsNext se iguala a su inverso, si antes era verdadero ahora será
falso.

Declaración de la función jumpTo, ésta recibe el argumento step y se encarga
de actualizar el estado stepNumber al valor de step y el estado xIsNext al
resultado del módulo 2 de step, si es igual a cero "0", será verdadero y si
es igual a 1 será falso.

Declaración de render.

Se declara la constante local history (no confundir con la constante declarada antes
dentro de la función handleClick y mucho menos con el estado history) y se iguala
con el valor actual del estado history.

Se declara la constante local current (mismo caso que la anterior) y se iguala al objeto
que se encuentra en el arreglo de la recién creada constante history en el índice
que corresponde al valor del estado stepNumber, para éste momento "1".

Se declara la constante local winner y se iguala al resultado que se obtiene al pasar el
arreglo squares que está dentro del objeto current por la función calculateWinner.

Se declara la  local moves y cada elemento de moves se iguala a lo que resulta 
de digerir cada elemento de arreglo de la constante history usando el método map.

Dicho método toma en este caso dos argumentos: step, que es el valor de cada uno
de los elementos que va "mapeando" y move, que será igual al respectivo índice de
dicho elemento, el método map itera sobre el arreglo que se le asigne.

Se declara la constante local desc (por descripción) que verifica si move no es igual a cero
"0" y le asigna como valor la cadena de texto "Go to move #" concatenada al valor de
move, y si move resulta ser igual a cero entonces la constante desc será igual a
"Go to game start".

Se declara un return dentro del map que para cada elemento del arrego en la constante
history va a crear un elemento <li/> cuya llave será igual al índice move y que a su
vez tiene como hijo un botón. Dicho botón tiene un atributo onClick que llama la función
jumpTo declarada previamente dentro de la clase Game, dándole como argumento el valor de
move, es decir, el índice del elemento mapeado desde el arreglo en la constante history.
Además el texto visible del botón será igual a la constante desc. Como map itera entre
los elementos del arreglo que se le proporciona, por cada elemento en el estado history
se creará un botón

Se declara la variable local status.

Se condiciona si la constante winner tiene un valor y si lo tiene, entonces la variable
status es igual a la cadena "Winner: " concatenado al valor de la constante winner, si no
entonces la constante status se iguala a la cadena "Next player: " concatenada al resultado
de revisar si el estado xIsNext es verdadero o falso para colocar una "X" o una "O" respec-
tivamente.

Se abre un return hijo de render y se llama finalmente la clase Board, ésta tiene como
primer atributo a squares, que es igual al arreglo squares que está dentro del objeto 
current. Dicho arreglo viaja desde la clase Game pasando como una propiedad de la clase
(componente) Board, donde finalmente llega a ser digerida por la función local renderSquare
y hace llegar el valor de cada elemento del arreglo a cada uno de los nueve botones creados
usando la función (componente) Square.


El segundo atributo de la clase (componente) Board es onclick, que llama la función handleClick 
recibiendo i como argumento. Dicha función corresponde a un evento, el evento de hacer click
sobre algo, en este caso la función está siendo pasada a la clase (componente) Board y ésta a
su vez se la pasa a la función (componente) Squares, pero es en Board donde se conoce de dónde
procede i, ya que en este punto cuando se declara la función renderSquare, se pasa i como
argumento de cada atributo onClick de cada botón que se crea.

Entonces, al hacer click en los botones del tablero, aquella numeración fija que vimos
dentro de la clase (componente) Board en cada uno de los llamados a la función renderSquare
es pasada desde el botón en específico al que le hicimos click y que fue creado por la función 
(comopnente) Square hasta la clase (componente) Board, y ésta a su vez hace llegar i hasta la
función handleClick que finalmente maneja el evento.

La variable status se muestra dentro de una etiqueta <div> y el arreglo moves se vierte dentro
de una lista ordenada <ol> llenándola de tantos botones como elementos haya en el status history.

*/
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/*
Se muestra finalmente en el DOM la clase (componente) Game en el "root"
*/

ReactDOM.render(<Game />, document.getElementById("root"));
/*
Declaración de la función calculateWinner, recibe como argumento squares.

Se declara la constante local lines y se iguala a un arreglo que contiene dentro de sí
las diferentes combinaciones de líneas rectas de tres elementos que puede haber en un
arreglo de tres por tres.

Se itera a través del arreglo lines y en cada paso se iguala el elemento de turno en
dicho arreglo lines a una constante anónima cuyos elementos son declarados como a, b y c.

Se condiciona si squares[a] tiene un valor que no es "null", 0 o undefined; si squares[a]
es igual a squares[b] y si squares[a] es también igual a squares[c]. Si se cumplen esas
tres condiciones entonces la función retorna el valor de squares[a].

Si no se ha cumplido la condición anterior entonces la función retorna "null".
*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
