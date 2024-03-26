import React, { useContext } from 'react'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { HistoryContainer, HistoryList, Status } from './styles'
import { CyclesContext } from '../../contexts/CyclesContext'

// Registra os fontes do pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs

const HistoryPage = () => {
  const { cycles } = useContext(CyclesContext)

  const generatePDF = () => {
    // Define o conteúdo do PDF usando pdfmake
    const documentDefinition = {
      content: [
        { text: 'Meu Histórico', style: 'header' },
        { text: '\n\n' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: [
              ['Tarefa', 'Duração', 'Início', 'Definição'],
              ...cycles.map((item) => [
                item.task,
                `${item.minutesAmount} minutos`,
                'Há 2 meses', // Aqui você pode ajustar para usar a data real
                'Concluído', // Aqui você pode adicionar a lógica para verificar o status
              ]),
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
      },
    }

    // Gera o PDF
    const pdfDoc = pdfMake.createPdf(documentDefinition)
    pdfDoc.open()
  }

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <button onClick={generatePDF}>Gerar PDF</button>
      <pre>{JSON.stringify(cycles, null, 2)}</pre>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Definição</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((item, index) => (
              <tr key={index}>
                <td>{item.task}</td>
                <td>{`${item.minutesAmount} minutos`}</td>
                <td>{new Date(item.startTime).toLocaleString()}</td>
                {/* Exibe a data e hora real de início */}
                <td>
                  {item.status === 'Concluído' ? (
                    <Status statusColor="green">Concluído</Status>
                  ) : item.status === 'Em andamento' ? (
                    <Status statusColor="yellow">Em andamento</Status>
                  ) : (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
};

export default HistoryPage;