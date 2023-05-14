const Pagination = ({
  count,
  limitResult,
  currentPage,
  setCurrentPage,
  maxPageLimit,
  setMaxPageLimit,
  minPageLimit,
  setMinPageLimit,
}) => {
  //   Nombre de page (nombre de résultat / nombre par page)
  const totalPages = Math.ceil(count / limitResult);
  setMaxPageLimit(totalPages);

  //   Création d'un tableau ou l'on push i jusqu'a la fin du nombre de page
  const pages = [];
  for (let i = 1; i < totalPages; i++) {
    pages.push(i);
    // console.log(i);
  }

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Créer un liste de avec chaque numero de page
  const pageNumbers = pages.map((page, index) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <button
          key={index}
          onClick={(event) => {
            const result = Object.values(event.target)[1].children;
            setCurrentPage(result);
          }}
        >
          {page}
        </button>
      );
    } else {
      return null;
    }
  });

  // const handleNextClick = () => {
  //   if ((currentPage - 1) % limitResult === 0) {
  //     setMaxPageLimit(maxPageLimit - limitResult);
  //     setMinPageLimit(minPageLimit - limitResult);
  //   }
  //   setCurrentPage((prev) => prev - 1);
  // };

  //   const handlePrevClick = () => {
  //     if (currentPage + 1 > maxPageLimit) {
  //       setMaxPageLimit(maxPageLimit + limitResult);
  //       setMinPageLimit(minPageLimit + limitResult);
  //     }
  //     setCurrentPage((prev) => prev + 1);
  //   };

  // let pageIncrementEllipses = null;
  // if (pages.length > maxPageLimit) {
  //   pageIncrementEllipses = <li onClick={handleNextClick()}>Logo</li>;
  // }

  //   let pageDecrementEllipses = null;
  //   //   if (pages.length > 0) {
  //   //     pageDecrementEllipses = <li onClick={handlePrevClick()}>Logo</li>;
  //   //   }

  return (
    <>
      <ul style={{ color: "white" }}>
        {/* {pageDecrementEllipses} */}
        {pageNumbers}
        {/* {pageIncrementEllipses} */}
      </ul>
    </>
  );
};

export default Pagination;
