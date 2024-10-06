import React from 'react';
import styled from 'styled-components';

const SafeLevelsContainer = styled.div`
  padding: 20px;
  margin-bottom: 60px;
`;

const SafeLevels = () => (
  <SafeLevelsContainer>
    <h2>Предельно допустимые концентрации</h2>
    <p>Информация о ПДК для людей с различными нарушениями здоровья.</p>
    <table>
      <thead>
        <tr>
          <th>Вещество</th>
          <th>ПДК (мг/м³)</th>
          <th>Рекомендации</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CO (угарный газ)</td>
          <td>0.5</td>
          <td>Избегать длительного пребывания на улице при высоких уровнях.</td>
        </tr>
        <tr>
          <td>NO2 (диоксид азота)</td>
          <td>0.04</td>
          <td>Людям с астмой следует избегать выхода на улицу.</td>
        </tr>
        <tr>
          <td>PM10 (частицы)</td>
          <td>0.05</td>
          <td>При высоком уровне следует оставаться в помещениях.</td>
        </tr>
        <tr>
          <td>PM2.5 (мелкие частицы)</td>
          <td>0.025</td>
          <td>Рекомендуется избегать физической активности на улице.</td>
        </tr>
      </tbody>
    </table>
  </SafeLevelsContainer>
);

export default SafeLevels;
