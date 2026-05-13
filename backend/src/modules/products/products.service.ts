import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase.db
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findAllAdmin() {
    const { data, error } = await this.supabase.db
      .from('products')
      .select('*, bookings(count)')
      .order('created_at', { ascending: false });
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.db
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) throw new NotFoundException(`Produkt #${id} nicht gefunden`);
    return data;
  }

  async create(dto: CreateProductDto) {
    const { data, error } = await this.supabase.db
      .from('products')
      .insert(dto)
      .select()
      .single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);
    const { data, error } = await this.supabase.db
      .from('products')
      .update(dto)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async remove(id: string) {
    await this.findOne(id);
    const { error } = await this.supabase.db
      .from('products')
      .delete()
      .eq('id', id);
    if (error) throw new InternalServerErrorException(error.message);
  }
}
