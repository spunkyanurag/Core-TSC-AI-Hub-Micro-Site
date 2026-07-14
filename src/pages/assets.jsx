import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { assets } from "@/mock-data";
import { useAuth } from "@/auth";
import { filterContentForUser } from "@/lib/content-access";
import { Search, Filter, Download, ArrowUpRight, Gauge, Zap } from "lucide-react";

export default function Assets() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const visibleAssets = filterContentForUser(assets, user);

  const filteredAssets = visibleAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === "all" || asset.platform === platformFilter;
    const matchesCategory = categoryFilter === "all" || asset.category === categoryFilter;
    
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  const platforms = Array.from(new Set(visibleAssets.map(a => a.platform)));
  const categories = Array.from(new Set(visibleAssets.map(a => a.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assets & Accelerators</h1>
          <p className="text-muted-foreground mt-2">Reusable IP to accelerate delivery and reduce risk.</p>
        </div>
        <Button className="bg-[#056BFC] hover:bg-[#056BFC]/90 text-white">
          <Download className="w-4 h-4 mr-2" /> Export Catalog
        </Button>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search assets..." 
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {platforms.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset, i) => (
          <motion.div
            key={asset.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <Card className="h-full flex flex-col hover:border-[#056BFC]/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline" className="bg-[#056BFC]/5 text-[#056BFC] border-[#056BFC]/20">{asset.category}</Badge>
                  <Badge variant="secondary" className="font-normal">{asset.platform}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">{asset.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {asset.description}
                </p>
                <div className="bg-[#F8F8FB] dark:bg-muted/50 p-3 rounded-md border border-border/50 flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#FABD00]" />
                  <div className="text-sm font-medium">{asset.businessValue}</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between items-center border-t border-border mt-auto p-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground" title="Effort Savings">
                  <Gauge className="w-4 h-4 text-[#3FD534]" />
                  <span>{asset.effortSavings}% savings</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-[#056BFC] hover:text-[#056BFC]/90">
                  Details <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {filteredAssets.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No assets found matching your access or filters.</p>
            <Button variant="link" onClick={() => {setSearchTerm(""); setPlatformFilter("all"); setCategoryFilter("all");}}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
