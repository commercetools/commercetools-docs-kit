import styled from '@emotion/styled';

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border: 0.0625rem solid #e6e6e6;
  border-radius: 0.375rem;
  background-color: #fff;
  box-shadow: 0 0.0625rem 0.0625rem 0 rgba(0, 0, 0, 0.25);
  border-collapse: separate;
  border-spacing: 0;

  th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    text-align: left;
    border: none;
    border-radius: 0.375rem 0.375rem 0 0;
    background-color: #f2f2f2;
    padding: 0.375rem 0.5rem;
    font-weight: 700;
  }

  tbody {
    tr:not(:first-of-type) {
      border-top: 1px solid #e6e6e6;
    }

    td {
      vertical-align: top;
      border-top: none;
      padding: 0.5rem;

      :first-of-type {
        width: 15rem;
        padding-left: 1rem;
      }

      :last-of-type {
        padding-right: 1rem;
      }
    }
  }
`;

export default Table;
