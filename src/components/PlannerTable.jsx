import ingredientDatabase from '../data/ingredientsDatabase.js'
import { useState } from 'react';

const styles = {
    title: {
      fontFamily: 'Merriweather, serif',
      fontSize: '24px',
      marginBottom: '10px',
    },
    input: {
      fontFamily: 'Caveat, cursive',
      fontSize: '18px',
      padding: '5px',
      width: '95%',
    },
    button: {
      fontFamily: 'Merriweather, serif',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    listItem: {
      fontFamily: 'Caveat, cursive',
      backgroundColor: '#c8e6c9',
      padding: '5px 10px',
      marginBottom: '5px',
      borderRadius: '5px',
      listStyle: 'none',
      fontSize: '18px',
    }
  };
  

function PlannerTable() {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const [meals, setMeals] = useState(Array(7).fill(null).map(() => ['', '', '']));
  const [shoppingList, setShoppingList] = useState([]);

  const handleChange = (dayIndex, mealIndex, value) => {
    const updatedMeals = meals.map(row => [...row]);
    updatedMeals[dayIndex][mealIndex] = value.toLowerCase();
    setMeals(updatedMeals);
  };

  const resetMeals = () => {
    setMeals(Array(7).fill(''));
    setShoppingList([]);
  };

  const generateShoppingList = () => {
    const ingredientsSet = new Set();

    meals.flat().forEach((meal) => {
      const ingredients = ingredientDatabase[meal];
      if (ingredients) {
        ingredients.forEach((item) => ingredientsSet.add(item));
      }
    });

    setShoppingList(Array.from(ingredientsSet));
  };

  return (
    <div style={{ padding: '20px' }} className="container">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Day</th>
            <th>Lunch</th>
            <th>Supper</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {days.map((day, index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Введите блюдо"
                  value={meals[index][0]} // завтрак
onChange={(e) => handleChange(index, 0, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Введите блюдо"
                  value={meals[index][1]} // обед
onChange={(e) => handleChange(index, 1, e.target.value)}

                />
              </td>
              <td>
                <input
                  type="text"
                  style={styles.input}
                  placeholder="Введите блюдо"
                  value={meals[index][2]} // ужин
onChange={(e) => handleChange(index, 2, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={resetMeals} style={styles.button}>
          Сбросить всё
        </button>
        <button onClick={generateShoppingList} style={styles.button}>
          Сформировать список покупок
        </button>
      </div>

      {shoppingList.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h1 style={styles.title}>🛒 Список покупок:</h1>
          <ul>
            {shoppingList.map((item, index) => (
             <li key={index} style={[{ listStyle: 'none', backgroundColor: 'purple', }, styles.listItem]} >{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PlannerTable;
