class ProductsPaginationDto {
  constructor(data) {
    this.status = data.docs ? "success" : "error";
    this.payload = data.docs;
    this.totalPages = data.totalPages;
    this.prevPage = data.prevPage;
    this.nextPage = data.nextPage;
    this.page = data.page;
    this.hasPrevPage = data.hasPrevPage;
    this.hasNextPage = data.hasNextPage;
    this.prevLink = data.prevPage ? `/api/products?page=${data.prevPage}&limit=${data.limit}` : null;
    this.nextLink = data.nextPage ? `/api/products?page=${data.nextPage}&limit=${data.limit}` : null;

    // Datos extra a la actividad, útiles para el front-end
    this.totalDocs = data.totalDocs;
    this.limit = data.limit;
  }
}

export default ProductsPaginationDto;
