import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Pages = (props) => {
  const {currentPage, pageCount, pageMove} = props

  return (
      <Pagination size="sm justify-content-center">
        <PaginationItem>
          <PaginationLink
            first
            href="#"
            onClick={() => pageMove(0)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            previous
            onClick={() =>
              0 === currentPage ? null : pageMove(currentPage - 1)
            }
          />
        </PaginationItem>
        {[...Array(pageCount)].map((data, i) => (
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={() => pageMove(i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
        <PaginationItem>
          <PaginationLink
            href="#"
            next
            onClick={() =>
              pageCount - 1 === currentPage ? null : pageMove(currentPage + 1)
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            last
            onClick={() => pageMove(pageCount - 1)}
          />
        </PaginationItem>
      </Pagination>
  );
};

export default Pages;
