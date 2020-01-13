import styled from '@emotion/styled';

const Table = styled.table`
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.25);
  border-collapse: separate;
  border-spacing: 0;

  thead {
    display: block;
    padding: 8px;
    background-color: #f2f2f2;
    border-radius: 6px 6px 0 0;
  }

  th {
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    text-align: left;
    border: none;
    font-weight: 700;
    line-height: 21px;
  }

  tbody {
    tr {
      display: block;
      padding: 8px 16px;

      :not(:first-of-type) {
        border-top: 1px solid #e6e6e6;
      }
    }

    td {
      vertical-align: top;
      border-top: none;

      :first-of-type {
        width: 200px;
      }

      :last-of-type {
        padding-left: 16px;
      }
    }
  }
`;

export default Table;
