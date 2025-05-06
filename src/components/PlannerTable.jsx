import ingredientDatabase from '../data/ingredientsDatabase.js'
import { useState } from 'react';
import plannerStyles from './styles/plannerTableStyles.js';
import styles from './styles/components.module.css'; 

function PlannerTable() {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  const [meals, setMeals] = useState(Array(7).fill(null).map(() => ['', '', '']));
  const [shoppingList, setShoppingList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false);
    const mealOptions = Object.keys(ingredientDatabase)
    const handleChange = (dayIndex, mealIndex, value) => {
        const updatedMeals = meals.map(row => [...row]);
        updatedMeals[dayIndex][mealIndex] = value; 
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
    <div
  className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}
>

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
              <select
  style={styles.input}
  value={meals[index][0]}
  onChange={(e) => handleChange(index, 0, e.target.value)}
>
  <option value="">Выберите блюдо</option>
  {mealOptions.map((meal, idx) => (
    <option key={idx} value={meal}>{meal}</option>
  ))}
</select>
              </td>
              <td>
              <select
  style={styles.input}
  value={meals[index][1]}
  onChange={(e) => handleChange(index, 1, e.target.value)}
>
  <option value="">Выберите блюдо</option>
  {mealOptions.map((meal, idx) => (
    <option key={idx} value={meal}>{meal}</option>
  ))}
</select>
              </td>
              <td>
              <select
  style={styles.input}
  value={meals[index][2]}
  onChange={(e) => handleChange(index, 2, e.target.value)}
>
  <option value="">Выберите блюдо</option>
  {mealOptions.map((meal, idx) => (
    <option key={idx} value={meal}>{meal}</option>
  ))}
</select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={resetMeals} style={plannerStyles.button}>
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
            <li
            key={index}
            style={{ 
              listStyle: 'none', 
              backgroundColor: 'purple',
              ...styles.listItem 
            }}
          >
            {item}
          </li>
          
            ))}
          </ul>
        </div>
      )}

      {/* Меню-бургер */}
      <button 
  onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
  style={{
    fontSize: '24px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    position: 'fixed',
    top: '20px',
    left: '20px',
    zIndex: 1101,
    color: 'orange',
  }}
>
  ☰
</button>


{/* Боковая панель */}
<div style={{
  position: 'fixed',
  top: 0,
  left: 0,
  width: '250px',
  height: '100%',
  backgroundColor: '#f4f4f4',
  padding: '20px',
  boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease',
  transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
  zIndex: 3,
}}>
  <h2>Меню</h2>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    <li><a href="#">Главная</a></li>
    <li><a href="#">О приложении</a></li>
    <li><a href="#">Контакты</a></li>
    <li style={{ cursor: 'pointer' }} onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? 'light-mode' : 'dark-mode'}
    </li>
  </ul>
</div>
    </div>


  );
}

export default PlannerTable;
