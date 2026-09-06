import { Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AuthRequest } from '../middlewares/auth.middleware';
import { uploadToS3 } from '../utils/fileUpload';
import { weatherService } from '../services/weather.service';
import { AppError } from '../utils/appError';

export const cropController = {
  // ---------- CROP LISTINGS ----------
  async createCropListing(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const files = (req.files as Express.Multer.File[]) || [];
      const imageUrls = await Promise.all(files.map((f) => uploadToS3(f, 'crops')));

      const { category, cropName, quantityKg, pricePerKg, harvestDate, location, latitude, longitude } = req.body;

      const listing = await prisma.cropListing.create({
        data: {
          farmerId: req.user!.id,
          category,
          cropName,
          quantityKg: parseFloat(quantityKg),
          pricePerKg: parseFloat(pricePerKg),
          harvestDate: harvestDate ? new Date(harvestDate) : undefined,
          location,
          latitude: latitude ? parseFloat(latitude) : undefined,
          longitude: longitude ? parseFloat(longitude) : undefined,
          images: imageUrls,
        },
      });

      res.status(201).json({ success: true, listing });
    } catch (err) { next(err); }
  },

  async getCropListings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { category, isSold } = req.query;

      const listings = await prisma.cropListing.findMany({
        where: {
          isActive: true,
          ...(category && { category: category as any }),
          ...(isSold !== undefined && { isSold: isSold === 'true' }),
        },
        include: { farmer: { select: { id: true, name: true, avgRating: true, isVerified: true, phone: true } } },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ success: true, listings });
    } catch (err) { next(err); }
  },

  async getCropListingById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const listing = await prisma.cropListing.findUnique({
        where: { id: req.params.id },
        include: { farmer: { select: { id: true, name: true, avgRating: true, isVerified: true, phone: true } } },
      });
      if (!listing) throw new AppError('Crop listing not found', 404);
      res.json({ success: true, listing });
    } catch (err) { next(err); }
  },

  async markCropSold(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const listing = await prisma.cropListing.findUnique({ where: { id: req.params.id } });
      if (!listing) throw new AppError('Crop listing not found', 404);
      if (listing.farmerId !== req.user!.id) throw new AppError('Not authorized', 403);

      const updated = await prisma.cropListing.update({ where: { id: req.params.id }, data: { isSold: true } });
      res.json({ success: true, listing: updated });
    } catch (err) { next(err); }
  },

  async deleteCropListing(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const listing = await prisma.cropListing.findUnique({ where: { id: req.params.id } });
      if (!listing) throw new AppError('Crop listing not found', 404);
      if (listing.farmerId !== req.user!.id) throw new AppError('Not authorized', 403);

      await prisma.cropListing.update({ where: { id: req.params.id }, data: { isActive: false } });
      res.json({ success: true, message: 'Listing removed' });
    } catch (err) { next(err); }
  },

  // ---------- MACHINERY ----------
  async createMachinery(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const files = (req.files as Express.Multer.File[]) || [];
      const imageUrls = await Promise.all(files.map((f) => uploadToS3(f, 'machinery')));

      const { type, name, rentalMode, pricePerHour, pricePerDay, latitude, longitude, address } = req.body;

      const machinery = await prisma.machinery.create({
        data: {
          ownerId: req.user!.id,
          type,
          name,
          rentalMode,
          pricePerHour: pricePerHour ? parseFloat(pricePerHour) : undefined,
          pricePerDay: pricePerDay ? parseFloat(pricePerDay) : undefined,
          latitude: latitude ? parseFloat(latitude) : undefined,
          longitude: longitude ? parseFloat(longitude) : undefined,
          address,
          images: imageUrls,
        },
      });

      res.status(201).json({ success: true, machinery });
    } catch (err) { next(err); }
  },

  async getMachineryList(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { type, rentalMode } = req.query;

      const machinery = await prisma.machinery.findMany({
        where: {
          isAvailable: true,
          ...(type && { type: type as any }),
          ...(rentalMode && { rentalMode: rentalMode as any }),
        },
        include: { owner: { select: { id: true, name: true, avgRating: true, isVerified: true, phone: true } } },
        orderBy: { createdAt: 'desc' },
      });

      res.json({ success: true, machinery });
    } catch (err) { next(err); }
  },

  async toggleMachineryAvailability(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const machinery = await prisma.machinery.findUnique({ where: { id: req.params.id } });
      if (!machinery) throw new AppError('Machinery not found', 404);
      if (machinery.ownerId !== req.user!.id) throw new AppError('Not authorized', 403);

      const updated = await prisma.machinery.update({
        where: { id: req.params.id },
        data: { isAvailable: !machinery.isAvailable },
      });

      res.json({ success: true, machinery: updated });
    } catch (err) { next(err); }
  },

  // ---------- MARKET PRICES (APMC) ----------
  async getMarketPrices(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { cropName, state } = req.query;

      const prices = await prisma.marketPrice.findMany({
        where: {
          ...(cropName && { cropName: { contains: cropName as string, mode: 'insensitive' } }),
          ...(state && { state: state as string }),
        },
        orderBy: { date: 'desc' },
        take: 50,
      });

      res.json({ success: true, prices });
    } catch (err) { next(err); }
  },

  // ---------- WEATHER ADVISORY ----------
  async getWeatherAdvisory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { latitude, longitude } = req.query;
      if (!latitude || !longitude) throw new AppError('Latitude and longitude required', 400);

      const advisory = await weatherService.getAdvisory(parseFloat(latitude as string), parseFloat(longitude as string));
      res.json({ success: true, advisory });
    } catch (err) { next(err); }
  },
};
