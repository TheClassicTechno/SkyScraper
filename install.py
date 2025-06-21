#!/usr/bin/env python3
"""
Test script to identify the correct import pattern for vapi_python
Run this script to see what's available in your vapi_python installation
"""

import sys

def test_imports():
    print("Testing vapi_python imports...")
    print("=" * 50)
    
    # Test 1: Try importing the module
    try:
        import vapi_python
        print("✅ Successfully imported vapi_python")
        print(f"   Module location: {vapi_python.__file__}")
        print(f"   Available attributes: {dir(vapi_python)}")
        
        # Check for common class names
        if hasattr(vapi_python, 'Client'):
            print("   ✅ Found Client class")
        if hasattr(vapi_python, 'Vapi'):
            print("   ✅ Found Vapi class")
        if hasattr(vapi_python, 'VapiClient'):
            print("   ✅ Found VapiClient class")
            
    except ImportError as e:
        print(f"❌ Failed to import vapi_python: {e}")
        return False
    
    print("\n" + "=" * 50)
    
    # Test 2: Try different import patterns
    import_patterns = [
        ("from vapi_python import Client", "vapi_python.Client"),
        ("from vapi_python import Vapi", "vapi_python.Vapi"),
        ("from vapi_python import VapiClient", "vapi_python.VapiClient"),
        ("from vapi_python.client import Client", "vapi_python.client.Client"),
        ("from vapi_python.vapi import Vapi", "vapi_python.vapi.Vapi"),
    ]
    
    working_imports = []
    
    for import_statement, description in import_patterns:
        try:
            exec(import_statement)
            print(f"✅ {description} - SUCCESS")
            working_imports.append((import_statement, description))
        except ImportError as e:
            print(f"❌ {description} - FAILED: {e}")
        except Exception as e:
            print(f"⚠️  {description} - ERROR: {e}")
    
    print("\n" + "=" * 50)
    
    if working_imports:
        print("✅ Working import patterns:")
        for import_stmt, desc in working_imports:
            print(f"   {import_stmt}")
        
        # Test instantiation with the first working import
        print("\nTesting client instantiation...")
        try:
            # Use the first working import
            import_stmt = working_imports[0][0]
            exec(import_stmt)
            
            # Try to create client instance
            if 'Client' in import_stmt:
                client = eval('Client(api_key="test_key")')
            elif 'Vapi' in import_stmt:
                client = eval('Vapi(api_key="test_key")')
            else:
                client = eval('VapiClient(api_key="test_key")')
                
            print(f"✅ Successfully created client instance")
            print(f"   Client type: {type(client)}")
            print(f"   Available methods: {[m for m in dir(client) if not m.startswith('_')]}")
            
        except Exception as e:
            print(f"❌ Failed to create client instance: {e}")
    else:
        print("❌ No working import patterns found!")
    
    return len(working_imports) > 0

def check_package_info():
    """Check package installation details"""
    print("\nPackage Information:")
    print("=" * 50)
    
    try:
        import pkg_resources
        package = pkg_resources.get_distribution('vapi-python')
        print(f"Package name: {package.project_name}")
        print(f"Version: {package.version}")
        print(f"Location: {package.location}")
    except:
        try:
            import importlib.metadata
            metadata = importlib.metadata.metadata('vapi-python')
            print(f"Package name: {metadata['Name']}")
            print(f"Version: {metadata['Version']}")
        except:
            print("Could not get package metadata")

def main():
    print("VAPI-PYTHON IMPORT DIAGNOSTICS")
    print("=" * 50)
    
    check_package_info()
    success = test_imports()
    
    print("\n" + "=" * 50)
    
    if success:
        print("✅ SUCCESS: Found working import patterns above")
        print("Use one of the working import statements in your code.")
    else:
        print("❌ FAILED: No working import patterns found")
        print("\nTroubleshooting steps:")
        print("1. Check if the package is installed: pip show vapi-python")
        print("2. Reinstall the package: pip uninstall vapi-python && pip install vapi-python")
        print("3. Try alternative packages: pip install vapi-ai")
        print("4. Check the official documentation at https://docs.vapi.ai")

if __name__ == "__main__":
    main()

#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "C:\\Users\\ellaa\\Downloads\\triple-zenith-451009-f5-b0018fcfe89d.json"