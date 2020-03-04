class WarehousesController < AdminController
  before_action :assign_warehouse, only: %i[show edit update destroy search]
  before_action :product_search, only: %i[show search]

  def index
    @warehouses = Warehouse.all
  end
    
  def show
    @stock = @warehouse.stocks.new
    # @products = @products_search
  end

  def new
    @warehouse = Warehouse.new 
  end

  def edit; end

  def create
    @warehouse = Warehouse.new(warehouse_params)

    if @warehouse.save
      flash.notice = 'Successfully created a warehouse!'
      redirect_to warehouse_path(@warehouse)
    else
      render :new
    end    
  end

  def update
    respond_to do |format|
      if @warehouse.update(warehouse_params)
        format.html { redirect_to @warehouse, notice: 'Warehouse was successfully updated.' }
      else
        format.html { render :edit }
      end
    end       
  end

  def destroy
    @warehouse.destroy
    respond_to do |format|
      format.html { redirect_to warehouses_url, notice: "Warehouse #{@warehouse.id} was successfully deleted." }
    end    
  end

  def search
    respond_to do |format|
      format.html { redirect_to action: :show, search: params[:search] }
      format.json { render json: { products: @products } }
    end
  end

  private

  def assign_warehouse
    @warehouse = Warehouse.find(params[:id])
  end
  
  def warehouse_params
    params.require(:warehouse).permit(:street, :city, :province)
  end

  def product_search
    # @products = Product.all
    if params[:search].blank?
      @products = Product.all
    else
      @parameter = params[:search].downcase
      @products = Product.all.where("lower(name) LIKE :search", search: "%#{@parameter}%")
    end
  end

end